import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true, // keep only if backend CORS allows credentials
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("auypct_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
