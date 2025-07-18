import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/user";

// create an axios instance

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Register user

export async function registerUser(userData) {
  try {
    const response = await axiosInstance.post("/register", userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
  }
}

// user login

export async function loginUser(userData) {
  try {
    const response = await axiosInstance.post("/login", userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

// todo

export async function createTodo(data) {
  try {
    const response = await axiosInstance.post("/todo", data);
     toast.success(response.data.message);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodo() {
  try {
    const response = await axiosInstance.get("/todo");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function completeTodo(todoId) {
  try {
    const response = await axiosInstance.patch(`/todo/${todoId}/complete`);
    toast.success(response.data.message);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(todoId) {
  try {
    const response = await axiosInstance.delete(`/todo/${todoId}`);
    toast.success(response.data.message);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
export async function updateTodo(id, data) {
  try {
    const response = await axiosInstance.put(`/todo/${id}`, data);
    toast.success(response.data.message);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
