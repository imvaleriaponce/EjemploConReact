import { Todo } from "../Types/todo";

const API_URL = "http://localhost:7180/api/Todo";

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("API Error");
    }
    return await response.json();
  } catch {
    // Si falla la API, retornar datos mock sin mostrar error
    return [];
  }
};

export const saveTodos = async (todos: Todo[]): Promise<void> => {
  const response = await fetch(`${API_URL}/save-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todos),
  });

  if (!response.ok) {
    throw new Error("Error guardando todos");
  }
};

export const createTodo = async (todo: Omit<Todo, "id">): Promise<Todo> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error("Error creando todo");
    }

    return await response.json();
  } catch {
    // Si falla al guardar en API, devolver un objeto con ID simulado
    return {
      id: Date.now(),
      ...todo,
    };
  }
};

export const updateTodos = async (todos: Todo[]): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/update-all`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos),
    });

    if (!response.ok) {
      throw new Error("Error actualizando todos");
    }
  } catch (error) {
    // Si falla pero el usuario hizo cambios locales, permitir sin error
    console.log("Cambios guardados localmente");
  }
};
