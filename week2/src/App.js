import React, { useEffect, useState } from "react";
import './style.css'

function App() {
  // to handle the state of the component
  const [tasks, setTasks] = useState([]);
  const [data, setData] = useState("");
  const [filter,setFilter] = useState("all");
  const [sorted, setSorted] = useState(true);
  // used to load the saved task once the app get started each time
  useEffect(()=>{
    const savedTasks = localStorage.getItem("tasks");
    if(savedTasks && setTasks != "undefined" && savedTasks !== "null"){
      try{
        setTasks(JSON.parse(savedTasks));
      }
      catch(error){
        // check if any data is not stored properly, if not delete the tasks and reload the components.
        console.error("Failed to parse tasks: ",error);
        localStorage.removeItem("tasks");
      }
    }
  }, []);

  // validted the input and handle adding new tasks.
  const addTask = () => {
    if (data.trim() === "") {
      alert("please enter task to add in list.");
      return;
    }
    // created an new task object
    const newTask = {
      id: Date.now(),
      text: data,
      completed: false
    };
    // to add the new task with the task array & save it to the local storage also
    const updatedTasks = [...tasks,newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks",JSON.stringify(updatedTasks));
    // to clear the input field
    setData("");

  };

  const deleteTask = (id) =>{
    const updatedTasks = tasks.filter(task=>task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks",JSON.stringify(updatedTasks));
  }

  const toggleComplete = (id) =>{
    const updatedTasks = tasks.map(task => task.id === id ? {...task,completed: !task.completed} : task);
    setTasks(updatedTasks);
    localStorage.setItem("tasks",JSON.stringify(updatedTasks));
  }

  const displayedTasks = tasks.filter(task =>{
    if(filter === "complete") return task.completed;
    if(filter === "incomplete") return !task.completed;
    return true;
  }).sort((a,b) =>{if(sorted){
    return a.text.localeCompare(b.text);
  }
  else{
    return b.text.localeCompare(a.text)
  }
});

  return (
    <div className="main">
      <h1 className="tag">To-Do List</h1>
      <input className="tasks" type="text" value={data} onChange={(e) => setData(e.target.value)} placeholder="enter your task." />
      <button onClick={addTask}className="addtasks">Add task</button>
      <div className="filter">
        <label>
        Filter:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="complete">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        </label>
        <label>
          Sort:
          <select value={sorted? "asc" : "desc"} onChange={(e) => setSorted(e.target.value === "asc")}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
      </div>
      <ul className="list">
        {displayedTasks.map((task) => (
          <li key={task.id} className="list-item">
            <span className="task-text" style={{textDecoration: task.completed?"line-through":"none",cursor:"pointer"}}>{task.text}</span>
            <div className= "button-group">
              {task.completed ? (
                <button onClick={() => toggleComplete(task.id)}>Mark Incomplete</button>
              ) : (
                <button onClick={() => toggleComplete(task.id)}>Mark Complete</button>
              )}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

};
export default App;
