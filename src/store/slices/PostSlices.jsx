import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found. Please log in again.");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

export const uploadImage = createAsyncThunk(
  "post/uploadImage",
  async ({ file, type = "post" }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);

      const response = await axios.post(`${BASE_URL}/upload/image`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

export const CreatePost = createAsyncThunk(
  "post/createPost",
  async ({ text, image_url, storageId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/posts`,
        { text, image_url, storageId },
        getAuthHeader()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

export const getPosts = createAsyncThunk(
  "post/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/posts`, getAuthHeader());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: error.message });
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    uploadData: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Upload Image
      .addCase(uploadImage.pending, (state) => {
        state.status = "uploading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "uploaded";
        state.uploadData = action.payload;
        state.error = null;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error;
      })

      // Create Post
      .addCase(CreatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
        state.error = null;
      })
      .addCase(CreatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error;
      })

      // Get Posts
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.error;
      });
  },
});

export default postSlice.reducer;
