import './App.css';
//import Header from "./MyComponents/Header";
//import Footer from "./MyComponents/Footer";
import Todos from "./MyComponents/Todos";
import AddTodo from "./MyComponents/AddTodo";
import React, { useEffect, useState } from 'react';
import Axios from './Axios';

function App() {
  // Initialize todos from local storage or an empty array
  const initTodos = () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  };

  const [todos, setTodos] = useState(initTodos);

  const onDelete = (todo) => {
    console.log("I am on delete of todo", todo);
    // Use the updatedTodos array for filtering and setTodos
    const updatedTodos = todos.filter((e) => e.sno !== todo.sno);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const addTodo = (title, desc) => {
    console.log("I am adding a todo", title, desc);
    // Generate sno using the updatedTodos array
    const sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    // Use the spread operator to update the todos array
    setTodos([...todos, myTodo]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      {/* <Header title="MY Todos list" searchBar={true} /> Use true for boolean props */}
      <Axios/>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
     
      {/* <Footer /> */}
      
    </>
  );
}

export default App;
