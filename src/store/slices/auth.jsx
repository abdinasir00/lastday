import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";

// ---------------- CHECK STATUS ----------------
export const CheckStatus = createAsyncThunk(
  "auth/CheckStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data.user;
    } catch (error) {
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      throw error;
    }
  }
);

// ---------------- REGISTER ----------------
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, userData);

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
export const userLogout = createAsyncThunk("auth/userLogout", async () => {
  await axios.post(`${BASE_URL}/auth/logout`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return null;
});

// ---------------- INITIAL STATE ----------------
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
  status: "idle",
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),      // important case 
};

// ---------------- SLICE ----------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // REGISTER
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
        state.isAuthenticated = true; 
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // LOGIN
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
        state.isAuthenticated = true;
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // // LOGOUT
    // builder.addCase(userLogout.fulfilled, (state) => {
    //   state.status = "idle";
    //   state.user = null;
    //   state.token = null;
    //   state.error = null;
    //   state.isAuthenticated = false;
    // });

    //  Logout

    builder
      .addCase(userLogout.pending, (state) => {
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
        state.status = "loading";
      })

      .addCase(userLogout.fulfilled, (state) => {
        state.error = null;
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })

      .addCase(userLogout.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
      });

    // CHECK STATUS
    builder
      .addCase(CheckStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckStatus.fulfilled, (state, action) => {
        state.status = "success";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(CheckStatus.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
