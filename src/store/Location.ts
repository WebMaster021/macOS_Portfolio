import {immer} from "zustand/middleware/immer";
import {create} from "zustand";
import {locations} from "#constants";

type RootLocation = typeof locations[keyof typeof locations];

type ChildLocation = typeof locations.work.children[number];

export type Location = RootLocation | ChildLocation;

interface LocationStore {
    activeLocation: Location | null;
    setActiveLocation: (location?: Location | null) => void;
    resetActiveLocation: () => void;
}

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationStore>()(immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location = null) => set((state) => {
        state.activeLocation = location;
    }),

    resetActiveLocation: () => set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
    }),
}))
);

export default useLocationStore;