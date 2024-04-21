import "server-only";
import { db } from "./db";
import { todos } from "./db/schema";

export async function getTodos() {
  const data = await db.select().from(todos);
  return data;
}

export const addTodo = async (id: number, text: string) => {
  await db.insert(todos).values({
    id: id,
    text: text,
  });
};
