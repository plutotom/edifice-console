// import { Status } from "./status";
// import { Tag } from "./tag";
// import { User } from "./user";

// export interface Todo {
//   id: string;
//   title: string;
//   previewTitle?: string;
//   tag: Tag | null;
//   url: string;
//   shareUrl: string;
//   contentUrl: string | null;
//   inProgress?: string;
//   projectId?: string | null;
//   user?: User | null;
//   date?: Date | null;
//   dateValue?: string | null;
//   status?: Status | Partial<Status> | null;
// }
export interface Todo {
  id: string;
  created_time: string | undefined;
  last_edited_time?: string;
  created_by: string | undefined;
  last_edited_by?: string | undefined;
  person: {
    object: string;
    id: string;
  };
  date: string;
  text: string;
  description?: string | undefined;
}
