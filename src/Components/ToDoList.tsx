import React from "react";
import { Todo } from "../Types/todo";
import { ToDo } from "./ToDo";

interface ToDoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export const ToDoList = ({ todos, onDelete }: ToDoListProps) => {
  return (
    <div>
      {todos.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No hay todos. ¡Crea uno nuevo!
        </div>
      ) : (
        todos.map((todo) => (
          <ToDo key={todo.id} todo={todo} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};
