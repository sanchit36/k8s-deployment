import { ITodo } from "@/interfaces/todo.interface";
import Link from "next/link";

interface TodoProps {
  todo: ITodo;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  return (
    <Link href={`/${todo.id}`} className="border p-2 w-full">
      <span className={`text-xl ${todo.completed ? "line-through" : ""}`}>
        {todo.title}
      </span>
    </Link>
  );
};

export default Todo;
