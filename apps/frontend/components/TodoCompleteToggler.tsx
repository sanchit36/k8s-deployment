"use client";

import { toggleCompleteStatus } from "@/actions/todo.actions";
import React from "react";

interface TodoCompleteTogglerProps {
  id: number;
  completed: boolean;
}

const TodoCompleteToggler: React.FC<TodoCompleteTogglerProps> = ({
  id,
  completed,
}) => {
  return (
    <button
      className="bg-black text-white dark:bg-white dark:text-black p-2 cursor-pointer"
      onClick={() => toggleCompleteStatus(id)}
    >
      {completed ? "Undo" : "Mark Done"}
    </button>
  );
};

export default TodoCompleteToggler;
