// src/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "" // empty so requests are relative and go through Vite proxy in dev
});

export default api;