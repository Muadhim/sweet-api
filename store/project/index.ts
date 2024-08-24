import { IProject } from "@/interfaces/Project";
import { create } from "zustand";

type State = {
  projects: IProject[];
  project: IProject;
};

type Actions = {
  setProjects: (p: IProject[]) => void;
  setProject: (p: IProject) => void;
  reset: () => void;
};

const initialState: State = {
  projects: [],
  project: {} as IProject,
};

const useProjectStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setProjects: (p: IProject[]) => {
    set({ projects: p });
  },
  setProject: (p: IProject) => {
    set({ project: p });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useProjectStore;
