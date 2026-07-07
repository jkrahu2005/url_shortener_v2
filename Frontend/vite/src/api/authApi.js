import axiosClient from "./axios";

export const register = (data) => {
  return axiosClient.post("/auth/register", data);
};

export const login = (data) => {
  return axiosClient.post("/auth/login", data);
};

export const logout = () => {
  return axiosClient.post("/auth/logout");
};

export const getCurrentUser = () => {
  return axiosClient.get("/auth/me");
};