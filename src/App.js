import React, { useState } from "react";
import ToDo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton"
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.complete
}
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

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
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
  <ToDo 
  id={task.id} 
  name={task.name}
  completed={task.completed} 
  key={task.id}
  toggleTaskCompleted={toggleTaskCompleted}
  deleteTask={deleteTask}
  editTask={editTask}  
  />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
      key={name} 
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
       />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining` 

  function addTask(name) {
    const newTask = {id: "todo-" + nanoid(), name: name, completed: "false"}
    setTasks([...tasks, newTask]);
  }

  //copy all objects into remainTasks that don't match the object of passed id
  function deleteTask(id) {
    const remaininTasks = tasks.filter(task => id !== task.id);
    setTasks(remaininTasks);
    
 
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });

    setTasks(editedTaskList);

  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      {filterList}
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