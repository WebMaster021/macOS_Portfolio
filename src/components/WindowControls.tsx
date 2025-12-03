import useWindowStore, {type WindowKey} from "#store/window.ts";

interface WindowControlsProps {
    target: WindowKey;
}

const WindowControls = ({target}: WindowControlsProps) => {
    const {closeWindow} = useWindowStore();

    return <div id="window-controls">
        <div className="close" onClick={() => closeWindow(target)} />
        <div className="minimize" />
        <div className="maximize" />
    </div>
}

export default WindowControls;