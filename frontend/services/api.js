import axios from "axios";

const API = axios.create({
  baseURL: "http://10.42.249.116:5000/api",
});

export default API;