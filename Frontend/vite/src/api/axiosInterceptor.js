import axios from "axios";

import {
  addToQueue,
  processQueue,
  getRefreshing,
  setRefreshing,
} from "./refreshQueue";

export default function setupInterceptors(axiosClient) {
  axiosClient.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // Don't try to refresh the refresh request itself
      if (originalRequest.url?.includes("/auth/refresh")) {
        return Promise.reject(error);
      }

      // Only handle first 401
      if (
        error.response?.status !== 401 ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // Wait if another refresh is already happening
      if (getRefreshing()) {
        await addToQueue();
        return axiosClient(originalRequest);
      }

      setRefreshing(true);

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        processQueue();

        return axiosClient(originalRequest);

      } catch (err) {

        processQueue(err);

        // ❌ Don't redirect here.
        // Let the calling thunk/component handle the unauthenticated state.

        return Promise.reject(err);

      } finally {

        setRefreshing(false);

      }
    }
  );
}