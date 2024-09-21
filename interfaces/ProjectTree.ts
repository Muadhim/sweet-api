import { TMethod } from "./Method";

export interface IProjectTree {
  id: number;
  name: string;
  author_id: number;
  type: "folder" | "api";
  method: TMethod;
  children: IProjectTree[];
}

export interface IProjectTreeResponse {
  project_name: string;
  project_tree: IProjectTree[];
}
