import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    fetch("https://backend-ced3e-default-rtdb.firebaseio.com/todo.json")
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "object") {
          let d = [];
          for (const key in data) {
            d.push(data[key]);
          }
          setTodos(d);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = (event) => {
    event.preventDefault();
    const newTodo = { text: todo, id: Date.now() };

    fetch("https://backend-ced3e-default-rtdb.firebaseio.com/todo.json", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json", 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodo("");
        setTodos((prevTodos) => [...prevTodos, newTodo]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodos = () => {
    fetch("https://backend-ced3e-default-rtdb.firebaseio.com/todo.json", {
      method: "DELETE",
    })
      .then((response) => {
        setTodos([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container mt-4">
      <form className="row g-3" onSubmit={submit}>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Todo"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
        </div>
        <div className="col-2">
          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={!todo}
          >
            Add
          </button>
        </div>
      </form>
      <hr />
      <button className="btn btn-danger" onClick={deleteTodos}>
        Delete Todos
      </button>
      <hr />
      <ul className="list-group">
        {todos.length > 0 ? (
          todos.map((todo, index) => (
            <li className="list-group-item" key={index}>
              {todo.text}
            </li>
          ))
        ) : (
          <li className="list-group-item">No todo</li>
        )}
      </ul>
    </div>
  );
}

export default App;
