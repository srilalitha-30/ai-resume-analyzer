import axios from "axios";

const API_URL = "https://ai-resume-analyzer-backend-i9nt.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
