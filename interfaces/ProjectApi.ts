import { TMethod } from "./Method";

export interface IProjectApi {
  id: number;
  name: string;
  folder_id: number;
  author_id: number;
  update_by: number;
  method: TMethod;
  path: string;
  request: string;
  response: string;
  description: string;
  example_request: string;
  example_response: string;
  project_id: number;
  created_at: Date;
  updated_at: Date;
}
