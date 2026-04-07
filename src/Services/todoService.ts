import { Todo } from "../Types/todo";

const API_URL = "https://localhost:7180/api/Todo";
export const getTodos = async (): Promise <Todo[]> => {
    const response = await fetch(API_URL);
    return response.json();
}