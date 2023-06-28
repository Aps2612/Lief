import React, { useState } from "react";
import AnalyticsDashboard from "./AnalyticsDashboard";
import Timer from "./Timer";
import "./TaskManagement.css"; 

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    tomatoes: 0,
    completed: false,
  });

  const handleInputChange = (event) => {
    setNewTask({
      ...newTask,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddTask = () => {
    if(newTask.title === ""){
    alert("Please enter title")
    return;
    }
    if(newTask.tomatoes === 0){
        alert("Please enter tomatoes")
    return;
    }
    if(!newTask.dueDate){
        alert("please mention a date")
        return;
    }
    setTasks([...tasks, newTask]);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      tomatoes: 0,
      completed: false,
    });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
  };

  const handleTimerComplete = (index) => {
    const updatedTasks = [...tasks];
    const completedTask = updatedTasks[index];

    // Update the task's tomatoes count
    completedTask.tomatoes += 1;

    // Start a break session after completing a work session
    const breakTask = {
      title: "Break",
      description: "Take a short break",
      dueDate: "",
      tomatoes: 0,
      completed: false,
    };

    // Insert the break task after the completed task
    updatedTasks.splice(index + 1, 0, breakTask);

    setTasks(updatedTasks);
  };

  const sortTasksByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.dueDate < b.dueDate) return -1;
      if (a.dueDate > b.dueDate) return 1;
      return 0;
    });
    setTasks(sortedTasks);
  };

  const filterCompletedTasks = () => {
    const filteredTasks = tasks.filter((task) => task.completed);
    setTasks(filteredTasks);
  };

  return (
    <div className="task-management">
      <h1>Task Management</h1>
      <div className="task-form">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <label>Description:</label>
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <label>Tomatoes:</label>
        <input
          type="number"
          name="tomatoes"
          value={newTask.tomatoes}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-actions">
        <button onClick={sortTasksByDueDate}>Sort by Due Date</button>
        <button onClick={() => setTasks([])}>Clear All Tasks</button>
        <button onClick={filterCompletedTasks}>Filter Completed Tasks</button>
      </div>

      <h2>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Tomatoes: {task.tomatoes}</p>
            {!task.completed ? (
              <Timer onTimerComplete={() => handleTimerComplete(index)} />
            ) : (
              <p>Completed</p>
            )}
            {!task.completed && (
              <button onClick={() => handleCompleteTask(index)}>
                Complete
              </button>
            )}
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <AnalyticsDashboard tasks={tasks} />
    </div>
  );
};

export default TaskManagement;
