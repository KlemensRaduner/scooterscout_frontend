import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (request) => {
    request.timeout = 5000;
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (config) => config,
  (error) => {
    return Promise.reject(error);
  }
);

api.all = axios.all;
export default api;
