import axios from "axios";

const API_URL = "https://task-manager-backend-ad77.onrender.com"; 

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const registerUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, { email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data; 
};

export const fetchTasks = async (status = "", sortOrder = "asc") => {
  const response = await axios.get(`${API_URL}/tasks`, {
    params: { status, sortBy: 'dueDate', order: sortOrder === 'asc' ? 1 : -1 }
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(`${API_URL}/tasks`, taskData);
  return response.data;
};

export const updateTask = async (taskId, updatedTask) => {
  const response = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/tasks/${taskId}`);
  return response.data;
};

export const filterTasks = async (status) => {
  const response = await axios.get(`${API_URL}/tasks/filter`, {
    params: { status },
  });
  return response.data;
};

export const sortTasks = async (order = "asc") => {
  const response = await axios.get(`${API_URL}/tasks/sort`, {
    params: { order },
  });
  return response.data;
};
