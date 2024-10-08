import { IUser } from "./User";

export interface IProject {
  id: number;
  name: string;
  author_id: number;
  members: IUser[];
  created_at: Date;
  updated_at: Date;
}
