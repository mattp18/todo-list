import React, { useState } from "react";
import ToDo from "./components/Todo";
import Form from "./components/Form";
import Filter from "./components/Filter";


function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks.map(task => (
  <ToDo 
  id={task.id} 
  name={task.name} 
  completed={task.completed}
  key={task.id}  
  />
  ));

  function addTask(name) {
    const newTask = {id: "id", name: name, completed: "false"}
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <Filter />
      <h2 id="list-heading">
        3 tasks remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App