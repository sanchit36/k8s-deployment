import { ITodo } from "@/interfaces/todo.interface";
import Todo from "./Todo";
import { cacheLife, cacheTag } from "next/cache";

const TodoList = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("todos");

  const todosResponse = await fetch(`${process.env.API_URL}/todos`);
  if (!todosResponse.ok) {
    return <p>Error: Fetching todos list...</p>;
  }
  const todosData = await todosResponse.json();

  if (!todosData.success) {
    return <p>Error: Fetching todos list...</p>;
  }

  const todos = todosData.data.todos;

  return (
    <div className="flex flex-col gap-4 w-full">
      {todos.map((todo: ITodo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
