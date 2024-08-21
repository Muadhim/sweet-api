import { IProject } from "@/interfaces/Project";
import { create } from "zustand";

type State = {
  projects: IProject[];
  project: IProject;
};

type Actions = {
  addProjects: (p: IProject[]) => void;
  addProject: (p: IProject) => void;
  reset: () => void;
};

const initialState: State = {
  projects: [],
  project: {} as IProject,
};

const useProjectStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  addProjects: (p: IProject[]) => {
    set({ projects: p });
  },
  addProject: (p: IProject) => {
    set({ project: p });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useProjectStore;
