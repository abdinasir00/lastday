

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

//
// ─── ASYNC THUNKS ────────────────────────────────────────────────────────────────
//

// 1️⃣ Create Notification
export const createNotification = createAsyncThunk(
  "Noty/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/notifications`, notificationData);
      console.log("Created notification:", res.data);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

// 2️⃣ Get All Notifications
export const getAllNotifications = createAsyncThunk(
  "Noty/getAllNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/notifications`);
      console.log("All notifications:", res.data);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

// 3️⃣ Get Single Notification by ID
export const getSingleNotification = createAsyncThunk(
  "Noty/getSingleNotification",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/notifications/${id}`);
      console.log("Single notification:", res.data);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

// 4️⃣ Update Notification by ID
export const updateNotification = createAsyncThunk(
  "Noty/updateNotification",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/notifications/${id}`, updatedData);
      console.log("Updated notification:", res.data);
      return res.data;
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

// 5️⃣ Delete Notification by ID
export const deleteNotification = createAsyncThunk(
  "Noty/deleteNotification",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/notifications/${id}`);
      console.log("Deleted notification ID:", id);
      return id; // return the deleted ID for removing from state
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return rejectWithValue(message);
    }
  }
);

//
// ─── INITIAL STATE ───────────────────────────────────────────────────────────────
//

const initialState = {
  notifications: [],
  singleNotification: null,
  status: "idle",
  error: null,
};

//
// ─── SLICE ──────────────────────────────────────────────────────────────────────
//

const notificationSlice = createSlice({
  name: "Noty",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ─────────────────────────────
      // CREATE
      // ─────────────────────────────
      .addCase(createNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications.push(action.payload);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ─────────────────────────────
      // READ (ALL)
      // ─────────────────────────────
      .addCase(getAllNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ─────────────────────────────
      // READ (SINGLE)
      // ─────────────────────────────
      .addCase(getSingleNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleNotification = action.payload;
      })
      .addCase(getSingleNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ─────────────────────────────
      // UPDATE
      // ─────────────────────────────
      .addCase(updateNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.notifications.findIndex(
          (n) => n.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ─────────────────────────────
      // DELETE
      // ─────────────────────────────
      .addCase(deleteNotification.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = state.notifications.filter(
          (n) => n.id !== action.payload
        );
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export default notificationSlice.reducer;
