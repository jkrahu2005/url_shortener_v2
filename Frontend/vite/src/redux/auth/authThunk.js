import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../api/authApi";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      // Register User
      await authApi.register(data);

      // Cookies are now set by backend
      // Fetch logged in user
      const response = await authApi.getCurrentUser();

      return response.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Registration failed."
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      await authApi.login(data);

      const response = await authApi.getCurrentUser();

      return response.data;

    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed."
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/currentUser",
  async (_, thunkAPI) => {
    try {
      const response = await authApi.getCurrentUser();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unauthorized."
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authApi.logout();
      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed."
      );
    }
  }
);