type Relation = {
  databaseId: string;
  propertyName: string;
};

type Status = {
  type: "status" | "checkbox";
  name: string;
  doneName?: string;
  completedStatuses?: string[];
  inProgressId?: string;
  notStartedId?: string;
};

type TypeWithValue<T> = {
  data: T;
  value: string;
};

type OptionalColumn = {
  name: string;
  value: string;
};

export type Database = {
  id: string;
  name: string;
  url: string;
  value: string;
  image: string;
  columns: {
    title: string[];
    date: string[];
    status: TypeWithValue<Status>[];
    project: TypeWithValue<Relation>[];
    assignee: OptionalColumn[];
    tags: OptionalColumn[];
    url: OptionalColumn[];
  };
};
// ----------------------
export interface NotionTodoDatabase {
  object: string;
  id: string;
  cover: null;
  icon: null;
  created_time: string;
  created_by: Created_by;
  last_edited_by: Last_edited_by;
  last_edited_time: string;
  title: TitleItem[];
  description: string[];
  is_inline: boolean;
  properties: Properties;
  parent: Parent;
  url: string;
  public_url: string;
  archived: boolean;
  in_trash: boolean;
  request_id: string;
}
interface Created_by {
  object: string;
  id: string;
}
interface Last_edited_by {
  object: string;
  id: string;
}
interface TitleItem {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}
interface Text {
  content?: string;
  link?: null;
  id?: string;
  name?: string;
  type?: string;
  title?: Title;
}
interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
interface Properties {
  Person: Person;
  "Last edited time": {
    id: string;
    name: string;
    type: string;
    last_edited_time: Last_edited_time;
  };
  Description: Description;
  Done: Done;
  "Created time": {
    id: string;
    name: string;
    type: string;
    created_time: Created_time;
  };
  "Due Date": {
    id: string;
    name: string;
    type: string;
    date: Date;
  };
  Text: Text;
}

interface Person {
  id: string;
  name: string;
  type: string;
  people: People;
}
interface People {
  object: string;
  // results: Result[];
  has_more: boolean;
  next_cursor: null;
}
interface Last_edited_time {
  start: string;
  end: string;
}
interface Description {
  id: string;
  name: string;
  type: string;
  rich_text: Rich_text;
}
interface Rich_text {}
interface Checkbox {
  id: string;
  name: string;
  type: string;
  checkbox: Checkbox;
}
interface Created_time {}

interface Done {
  id: string;
  name: string;
  type: string;
  checkbox: Checkbox;
}
// interface Checkbox {}
// interface Created_time {}
// interface Date {}
// interface Title {}
interface Parent {
  type: string;
  page_id: string;
}
