import { Client } from "@notionhq/client";
// import { NotionTodoDatabase } from "../lib/notionTypes/database.ts";
import { Todo } from "../lib/notionTypes/todo.js";

const createClient = async () => {
  const token = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error("Please provide a NOTION_TOKEN environment variable");
  }
  // Initializing a client
  const notion = await new Client({
    auth: process.env.NOTION_TOKEN,
  });

  return notion;
};

const getAllNotionTodos = async () => {
  const notion = await createClient();

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error("Please provide a NOTION_DATABASE_ID environment variable");
  }

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  const todos: Todo = response.results.map((page) => {
    return {
      id: page.id,
      done: page.properties.Done.checkbox,
      created_time: page.properties.created_time,
      last_edited_time: page.properties["Last edited time"].last_edited_time,
      created_by: page.properties.created_by,
      last_edited_by: page.properties.last_edited_by,
      person: page.properties.Person.people[0].name as string,
      date: page.properties["Due Date"].date.start as string,
      text: page.properties.Text.title[0].text.content,
      description: page.properties.Description.rich_text.forEach(
        (description) => description.text.content,
      ),
    };
  });

  return todos;
};
export default getAllNotionTodos;
