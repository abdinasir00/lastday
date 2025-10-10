

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";

// ---------------- REGISTER ----------------
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userData);
      console.log(" Registered user:", res.data);

      // Save token and user to localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Registration failed";
      return rejectWithValue(message);
    }
  }
);

// ---------------- LOGIN ----------------
export const userlogin = createAsyncThunk(
  "auth/userlogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, userData);
      console.log(" Logged in user:", res.data);

      // Save token and user to localStorage
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// ---------------- LOGOUT ----------------
export const userLogout = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
});

// ---------------- INITIAL STATE ----------------
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
};

// ---------------- SLICE ----------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register Cases
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Login Cases
    builder
      .addCase(userlogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Logout Cases
    builder.addCase(userLogout.fulfilled, (state) => {
      state.status = "idle";
      state.user = null;
      state.token = null;
      state.error = null;
    });
  },
});

export default authSlice.reducer;
