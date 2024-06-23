import { useEffect } from "react";
import { useState } from "react";

function App() {
 let [todo, setTodo] = useState("")
 let [todos, setTodos] = useState([])

const getTodos = () => {
  fetch("https://backend-ced3e-default-rtdb.firebaseio.com/todo.json")
  .then((response)=> {
    return response.json()
  }).then((data) => {
    // console.log(data);
    if(typeof data === "object"){
      let d = [];
      for (const key in data) {
      d.push(data[key]); 
      }
      setTodos([...d])
    }
  })
  .catch(err => {
    console.log(err);
  })
}

const submit  = (event) => {
  event.preventDefault();


  fetch("https://backend-ced3e-default-rtdb.firebaseio.com/todo.json",{
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "content-type": "application/json"
    }
  }).then((response)=> {
    setTodo("")
   setTodos([...todos, todo])
    // console.log(response.json);
  }).catch(err => {
    console.log(err);
  })
  }


  const deleteTodos = () => {
    fetch("https://backend-ced3e-default-rtdb.firebaseio.com/todo.json",{
      method: "DELETE"
    })
    .then((response)=> {
      setTodos([])
    }).catch(err => {
      console.log(err);
    })
  }



  useEffect(()=> {
    getTodos();
  },[todos.length])

  return (
    <div className="container mt-4">
      <form className="row g-3" onSubmit={submit}>
        <div className="col-10 ">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Todo"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
        </div>

        <div class="col-2">
          <button type="submit" className="btn btn-primary mb-3"disabled ={todo ? false: true} >Add </button>
        </div>
      </form>

<hr />
        <button className="btn btn-danger" onClick={deleteTodos}>Delete Todos</button>
<hr />
      <ul className="list-group">
       {
       todos.length > 0 ? todos.map((todo,index) =>(
        <li className="list-group-item" key = {index}>{todo}</li>
       )):<li className="list-group-item">No todo</li>
       }
      </ul>
    </div>
  );
}
export default App;
