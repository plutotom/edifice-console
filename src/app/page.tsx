import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getTodos } from "~/server/queries";

export const dynamic = "force-dynamic"; // makes sure changes update on page if database data changes

export default async function HomePage() {
  const todos = await getTodos();

  return (
    <main className="">
      <Card className="w-[350px]">
        <h1>Edifice Console</h1>

        {todos?.map((todo) => (
          <div key={todo.id}>
            <p>{todo.text}</p>
            <p>{todo.description}</p>
          </div>
        ))}

        <CardHeader>
          <CardTitle>Edifice Console</CardTitle>
          <CardDescription>Edifice Console</CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
