export interface IProjectTree {
  id: number;
  name: string;
  author_id: number;
  type: string;
  method: string;
  children: IProjectTree[];
}

export interface IProjectTreeResponse {
  project_name: string;
  project_tree: IProjectTree[];
}
