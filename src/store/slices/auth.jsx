
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, userData);
      console.log("data of user is", res.data.user);
      return res.data;
    } catch (error) {
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      throw error;
    }
  }
);


export const userlogin = createAsyncThunk(
  "auth/userlogin",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, userData);
      console.log("data of user is", res.data.user);
      return res.data;
    } catch (error) {
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      throw error;
    }
  }
);


// export const userLogout = createAsyncThunk("auth/logoutUser", async () => {
//   await axios.post(`${BASE_URL}/auth/logout`);
// });

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register Cases
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });

    //    login
        builder
          .addCase(userlogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;

        
      })
      //      // Logout cases
      // .addCase(userLogout.fulfilled, (state) => {
      //   state.status = "idle";
      //   state.isAuthenticated = false;
      //   state.user = null;
      //   state.error = null;
      // })
      
  },
});

export default authSlice.reducer;
