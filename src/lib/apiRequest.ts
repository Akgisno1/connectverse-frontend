import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://rentifyapi-4wih.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;
