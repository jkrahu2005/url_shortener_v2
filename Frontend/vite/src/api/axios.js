import axios from "axios";

import setupInterceptors from "./axiosInterceptor";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosClient);

export default axiosClient;