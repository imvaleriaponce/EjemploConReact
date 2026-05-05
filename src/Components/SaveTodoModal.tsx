import React, { useState } from "react";
import { Todo } from "../Types/todo";
import { createTodo } from "../Services/todoService";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSuccess: (newTodo: Todo) => void;
}

export const SaveTodoModal = ({
  isOpen,
  onClose,
  onAddSuccess,
}: AddTodoModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    value: "",
    status: "Pending",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.value.trim()) {
      setError("El nombre del todo es requerido");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const newTodo: Omit<Todo, "id"> = {
        value: formData.value,
        status: formData.status,
        CreateDate: new Date().toISOString(),
      };

      const createdTodo = await createTodo(newTodo);
      onAddSuccess(createdTodo);
      setFormData({ value: "", status: "Pending" });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error creando todo");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Agregar Nuevo Todo</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              disabled={isLoading}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="value" className="form-label">
                  Descripción del Todo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="Ingrese la descripción"
                  disabled={isLoading}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Estado
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={isLoading}
                >
                  <option value="Pending">Pendiente</option>
                  <option value="Completed">Completado</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Agregar Todo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
