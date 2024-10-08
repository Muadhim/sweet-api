import { IProject } from "@/interfaces/Project";
import { IProjectApi } from "@/interfaces/ProjectApi";
import { IProjectTreeResponse } from "@/interfaces/ProjectTree";
import { create } from "zustand";

type State = {
  projects: IProject[];
  project: IProject;
  projectTree: IProjectTreeResponse;
  projectId: number;
  projectApi: IProjectApi;
};

type Actions = {
  setProjects: (p: IProject[]) => void;
  setProject: (p: IProject) => void;
  setProjectTree: (pt: IProjectTreeResponse) => void;
  setProjectId: (id: number) => void;
  setProjectApi: (pa: IProjectApi) => void;
  reset: () => void;
};

const initialState: State = {
  projects: [],
  project: {} as IProject,
  projectTree: {} as IProjectTreeResponse,
  projectId: 0,
  projectApi: {} as IProjectApi,
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
  setProjectId: (id: number) => {
    set({ projectId: id });
  },
  setProjectApi: (pa: IProjectApi) => {
    set({ projectApi: pa });
  },
  reset: () => {
    set(initialState);
  },
}));

export default useProjectStore;
