import axios from "axios";

const API_URL = "http://localhost:8081";

export const api = axios.create({
  baseURL: API_URL,
});

// Register
export const message = (username, email, password) =>
  api.post("/auth/register", { username, email, password });

// Login
export const login = (email, password) =>
  api.post("/auth/login", { email, password });
