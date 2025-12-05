import {WindowControls} from "#components";
import {Search} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper.tsx";
import {locations} from "#constants";
import useLocationStore from "#store/Location.ts";
import clsx from "clsx";
import type {Location} from "#store/Location.ts";
import useWindowStore from "#store/window.ts";
import type {WindowKey} from "#store/window.ts";

const Finder = () => {
    const { openWindow } = useWindowStore();

    const { activeLocation, setActiveLocation } = useLocationStore();

    const openItem = (item: Location) => {
        if( "fileType" in item && item.fileType === "pdf") return openWindow("resume");
        if(item.kind === "folder") return setActiveLocation(item);

        if("fileType" in item && ["fig", "url"].includes(item.fileType as string) && "href" in item) return window.open(item.href as string, "_blank");

        if("fileType" in item) {
            const key = `${item.fileType}${item.kind}` as WindowKey;
            openWindow(key, item);
        }
    }

    const renderList = (name: string, items: Location[]) => (
        <div>
            <h3>{name}</h3>

            <ul>
                {items.map((item) => (
                <li key={item.id} onClick={() =>
                    setActiveLocation(item)}
                    className={clsx(item.id === activeLocation?.id ? 'active' : 'not-active')}
                >

                    <img src={item.icon} className="w-4" alt={item.name} />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
                ))}
            </ul>
        </div>
    );

    return <>
        <div id="window-header">
            <WindowControls target="finder" />
            <Search className="icon" />
        </div>

        <div className="bg-white flex h-full">
            <div className="sidebar">
                {renderList("Favorites", Object.values(locations))}
                {renderList("Work", locations.work.children)}
            </div>

            {activeLocation && 'children' in activeLocation && (
                <ul className="content">
                    {activeLocation?.children.map((item) => (
                        <li key={item.id} className={"position" in item ? item.position : ""}
                            onClick={() => openItem(item as Location)}
                        >
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </>
}

const FinderWindow = WindowWrapper(Finder, "finder")

export default FinderWindow;