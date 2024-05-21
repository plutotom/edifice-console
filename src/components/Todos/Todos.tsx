import type { TodoType } from "../../lib/notionTypes/todo";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function Todos({ data }: { data: TodoType[] }) {
  return (
    <Card className="w-9/12 overflow-hidden bg-slate-700 p-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Person</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Done</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.text}</TableCell>
              <TableCell>{todo.person}</TableCell>
              <TableCell>{todo.date}</TableCell>
              <TableCell>{todo.done ? "✔" : "❌"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
