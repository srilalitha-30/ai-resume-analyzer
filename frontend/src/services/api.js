import axios from "axios";

const api = axios.create({
  baseURL: "/api",   // same domain
});

export default api;
