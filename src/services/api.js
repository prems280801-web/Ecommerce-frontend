import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-va3f.onrender.com/api",
});

export default API;