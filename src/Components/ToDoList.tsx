import React from 'react'
import { Todo } from '../Types/todo';

interface ToDoProps{
  todos: Todo[];
}
export const ToDoList = ({todos}: ToDoProps) => {
  return (
    <div>{todos.length}</div>
  )
};
