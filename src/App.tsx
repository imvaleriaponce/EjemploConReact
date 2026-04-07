import  React from 'react';
import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './Components/Header';
import { ToDoList } from './Components/ToDoList';
import { Todo } from './Types/todo';
import { getTodos } from './Services/todoService';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
    console.log(data);

  };

  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <>

      <Header></Header>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Todos</h3>
        <button className="btn btn-success">+ Add Todo</button>
      </div>
      <ToDoList todos={todos}></ToDoList>
      
    </>
  );
}

export default App;
