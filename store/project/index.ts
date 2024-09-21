import { IProject } from "@/interfaces/Project";
import { IProjectTreeResponse } from "@/interfaces/ProjectTree";
import { create } from "zustand";

type State = {
  projects: IProject[];
  project: IProject;
  projectTree: IProjectTreeResponse;
};

type Actions = {
  setProjects: (p: IProject[]) => void;
  setProject: (p: IProject) => void;
  setProjectTree: (pt: IProjectTreeResponse) => void;
  reset: () => void;
};

const initialState: State = {
  projects: [],
  project: {} as IProject,
  projectTree: {} as IProjectTreeResponse,
};

const useProjectStore = create<State & Actions>()((set, get) => ({
  ...initialState,
  setProjects: (p: IProject[]) => {
    set({ projects: p });
  },
  setProject: (p: IProject) => {
    set({ project: p });
  },
  setProjectTree: (pt: IProjectTreeResponse) => {
    set({ projectTree: pt });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useProjectStore;
