import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const getTodos = async () => {
    const res = await axios.get("http://localhost:8000/api/todos/");
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    await axios.post("http://localhost:8000/api/todos/", { title: newTodo });
    setNewTodo("");
    getTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.patch(`http://localhost:8000/api/todos/${id}/`, { completed: !completed });
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/api/todos/${id}/`);
    getTodos();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ToDo App</h1>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />
            <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
