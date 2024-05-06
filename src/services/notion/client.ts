import "server-only"; // This line make sure that the file never get imported by the client to avoid leaking your Notion Token.
import { Client } from "@notionhq/client";

export async function notion(): Promise<Client> {
  const token: string | undefined = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error("Unauthorized, please sign in to Notion");
  }

  return new Client({
    auth: token,
  });
}
