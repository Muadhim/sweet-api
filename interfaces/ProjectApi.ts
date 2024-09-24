import { TMethod } from "./Method";
import { IUser } from "./User";

export interface IProjectApi {
  id: number;
  name: string;
  folder_id: number;
  author: IUser;
  update_by: IUser;
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
