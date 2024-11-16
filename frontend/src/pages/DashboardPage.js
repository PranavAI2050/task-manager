import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, updateTask } from "../services/api";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", status: "" });
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditFormVisible, setEditFormVisible] = useState(false); 
  const [taskToEdit, setTaskToEdit] = useState(null); 

  useEffect(() => {
    const getTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks(statusFilter, sortOrder);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, [statusFilter, sortOrder]);


  const handleAddTask = async () => {
    try {
      const taskWithStatus = { ...newTask, status: newTask.status || "To Do" };
      const task = await createTask(taskWithStatus);
      setTasks([...tasks, task]);
      setNewTask({ title: "", description: "", dueDate: "", status: "" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setEditFormVisible(true); 
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setTaskToEdit((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTaskFromServer = await updateTask(taskToEdit._id, taskToEdit);
      setTasks(tasks.map((task) => (task._id === taskToEdit._id ? updatedTaskFromServer : task)));
      setEditFormVisible(false);  
      setTaskToEdit(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="date"
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <label>
          Filter by Status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="To Do">To Do</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </label>

        <label>
          Sort by Due Date:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description} - {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {task.status}
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
            <button onClick={() => handleEditClick(task)}>Edit</button>
          </li>
        ))}
      </ul>

      {isEditFormVisible && taskToEdit && (
        <div>
          <h3>Edit Task</h3>
          <input
            type="text"
            name="title"
            value={taskToEdit.title}
            onChange={handleEditFormChange}
          />
          <input
            type="text"
            name="description"
            value={taskToEdit.description}
            onChange={handleEditFormChange}
          />
          <input
            type="date"
            name="dueDate"
            value={taskToEdit.dueDate}
            onChange={handleEditFormChange}
          />
          <select name="status" value={taskToEdit.status} onChange={handleEditFormChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={handleUpdateTask}>Save</button>
          <button onClick={() => setEditFormVisible(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
