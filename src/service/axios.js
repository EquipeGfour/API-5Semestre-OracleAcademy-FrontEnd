import axios from 'axios';

const api = axios.create({
  baseURL: "http://10.0.2.2:3004"
});

export default api;