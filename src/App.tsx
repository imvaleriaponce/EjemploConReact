import React from "react";
import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Header } from "./Components/Header";
import { ToDoList } from "./Components/ToDoList";
import { SaveTodoModal } from "./Components/SaveTodoModal";
import { Todo } from "./Types/todo";
import { getTodos, updateTodos, deleteTodo } from "./Services/todoService";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setUpdateMessage(null);
      const todoToDelete = todos.find((todo) => todo.id === id);
      if (!todoToDelete) throw new Error("Todo no encontrado");
      await deleteTodo(todoToDelete);
      setTodos(todos.filter((todo) => todo.id !== id));
      setUpdateMessage("✓ Todo eliminado correctamente");
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (error) {
      setUpdateMessage("Error al eliminar el todo");
      setTimeout(() => setUpdateMessage(null), 3000);
    }
  };

  const handleUpdateTodos = async () => {
    try {
      setIsUpdating(true);
      setUpdateMessage(null);
      await updateTodos(todos);
      setUpdateMessage("¡Todos actualizados correctamente!");
      setTimeout(() => setUpdateMessage(null), 3000);
    } catch (error) {
      setUpdateMessage(
        "Error actualizando. Los cambios se guardaron localmente.",
      );
      setTimeout(() => setUpdateMessage(null), 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="app-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Todos</h3>
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => setShowSaveModal(true)}
            >
              + Agregar Todo
            </button>
          </div>
        </div>
        {updateMessage && (
          <div
            className={`alert ${
              updateMessage.includes("Error")
                ? "alert-warning"
                : "alert-success"
            } alert-dismissible fade show`}
            role="alert"
          >
            {updateMessage}
          </div>
        )}
        <ToDoList todos={todos || []} onDelete={handleDeleteTodo}></ToDoList>
      </div>

      <SaveTodoModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onAddSuccess={handleAddTodo}
      />
    </>
  );
}

export default App;
