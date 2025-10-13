
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import axios from "axios";
import { BASE_URL } from "../baseUrl";

// Helper function to get the authorization header
const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };
};


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

// Check authentication status
export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/me`,
        getAuthHeader()
      );
      return response.data;

    } catch (error) {
      throw new Error(error.response?.data?.error || "Unauthorized");
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

// Register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      console.log("USERDATA", userData);
      const response = await axios.post(
        `${BASE_URL}/auth/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      console.log("response", response);
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  }
);

// Logout user
const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("authToken");
});

export const fetchConnections = createAsyncThunk(
  "auth/fetchConnections",
  async (userId, thunkAPI) => {
    try {
      const [followingRes, followersRes] = await Promise.all([
        axios.get(`${BASE_URL}/users/me/following`, getAuthHeader()),
        axios.get(`${BASE_URL}/users/me/followers`, getAuthHeader()),
      ]);
      console.log("Raw following:", followingRes.data);
      return {
        following: followingRes.data.map((u) => u.id),
        followers: followersRes.data.map((u) => u.id),
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch connections"
      );
    }
  }
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),      // important case 
};

// ---------------- SLICE ----------------
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},

  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },

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

      // Check Auth
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;

        state.error = null;
        state.isAuthenticated = true; 
      })
      .addCase(registerUser.rejected, (state, action) => {
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

        state.error = action.error.message;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        console.log("action.payload", action.payload);

        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
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

        state.error = action.error.message;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.followingIds = action.payload.following;
        state.followerIds = action.payload.followers;
      })
      // Update user when profile is updated
      .addCase('profile/updateUserProfile/fulfilled', (state, action) => {
        if (state.user && (state.user.id === action.payload.id || state.user._id === action.payload.id)) {
          state.user = { ...state.user, ...action.payload };
          console.log("Updated user in auth slice:", state.user);
        }
      })
      // Update user when profile is fetched
      .addCase('profile/fetchMyProfile/fulfilled', (state, action) => {
        if (state.user && (state.user.id === action.payload.id || state.user._id === action.payload.id)) {
          state.user = { ...state.user, ...action.payload };
          console.log("Updated user in auth slice from fetch:", state.user);
        }

      });
  },
});

export const { clearError } = authSlice.actions;
export { logoutUser };
export default authSlice.reducer;