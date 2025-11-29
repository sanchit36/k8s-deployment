import { getTodo } from "@/actions/todo.actions";
import { ITodo } from "@/interfaces/todo.interface";
import React from "react";
import TodoCompleteToggler from "./TodoCompleteToggler";

interface TodoDetailsProps {
  params: Promise<{ id: string }>;
}

const TodoDetails: React.FC<TodoDetailsProps> = async ({ params }) => {
  const { id } = await params;
  const todoData = await getTodo(id);

  if (!todoData.success) {
    return <p>Error: Fetching failed to todo details</p>;
  }

  const todo: ITodo = todoData.data.todo;

  return (
    <div className="flex flex-col gap-2">
      <p>{todo.id}</p>
      <p>{todo.title}</p>
      <TodoCompleteToggler id={todo.id} completed={todo.completed} />
    </div>
  );
};

export default TodoDetails;
