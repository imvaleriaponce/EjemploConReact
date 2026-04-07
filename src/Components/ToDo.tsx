import { Todo } from "../Types/todo";

interface ToDoProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

export const ToDo = ({ todo, onToggle }: ToDoProps) => {
  return (
    <div className="card mb-2 p-3 d-flex flex-row justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={todo.status === 'Completed'}
          onChange={() => onToggle(todo.id)}
        />
        {todo.value}
      </div>

      <div className="text-muted">
         {new Date(todo.CreateDate).toDateString()}
      </div>
    </div>
  );
};