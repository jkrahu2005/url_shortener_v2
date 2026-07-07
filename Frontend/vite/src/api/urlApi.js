import axiosClient from "./axios";

export const shortenUrl = (data) =>
  axiosClient.post("/url/shorten", data);

export const getMyUrls = () =>
  axiosClient.get("/url/my-urls");

export const deleteUrl = (id) =>
  axiosClient.delete(`/url/${id}`);

export const getUrlAnalytics = (id) =>
  axiosClient.get(`/url/${id}/analytics`);

export const getDashboardStats = () =>
  axiosClient.get("/url/dashboard-stats");

export const getUserUrls = () =>
  axiosClient.get("/url/my-urls");