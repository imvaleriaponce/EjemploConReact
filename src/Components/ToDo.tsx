import { Todo } from "../Types/todo";

interface ToDoProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const formatDate = (dateString: string): string => {
  try {
    // Si la fecha no tiene zona horaria, agregar Z para UTC
    const normalizedDateString =
      dateString.includes("Z") ||
      dateString.includes("+") ||
      dateString.includes("-", 10)
        ? dateString
        : `${dateString}Z`;

    const date = new Date(normalizedDateString);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Fecha inválida";
  }
};

export const ToDo = ({ todo, onDelete }: ToDoProps) => {
  return (
    <div className="card mb-2 p-3 d-flex flex-row justify-content-between align-items-center">
      <div>{todo.value}</div>

      <div className="text-muted d-flex align-items-center gap-2">
        <span>{formatDate(todo.CreateDate)}</span>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(todo.id)}
          title="Eliminar"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
