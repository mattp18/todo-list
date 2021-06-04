import React, { useState } from "react";
import ToDo from "./components/Todo";
import Form from "./components/Form";
import Filter from "./components/Filter";
import { nanoid } from "nanoid";


function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task =>{
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task
    });
    setTasks(updatedTasks);
  }

  //why does the ToDo component props need to match the task.attribute name?
  const taskList = tasks.map(task => (
  <ToDo 
  id={task.id} 
  name={task.name} 
  toggleTaskCompleted={toggleTaskCompleted}
  key={task.id}  
  />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining` 

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: "false"}
    setTasks([...tasks, newTask]);
  }


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <Filter />
      <h2 id="list-heading">
        {headingText}
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