import { createSlice, createAsyncThunk } from  "@reduxjs/toolkit";
import { BASE_URL } from "../BaseUrl";
import axios from "axios";

export const  CreatePost = createAsyncThunk(
    "post/CreatePost",
    async(data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/posts`, data);
            console.log("created post is ", response)
            return response.data

        } catch(error) {
            if (error.response?.data?.error){
                return rejectWithValue (error.response.data,error)
            }
        }
    }
)




const initialState =  {
    user: null,
    status: "idle",
    error: null
}


const  postSlice = createSlice ({
    name: "post",
    initialState,
    extraReducers : (builder) => {
        builder
        //createPost
          .addCase(CreatePost.pending, (state) => {
                state.status = "loading";
                state.error = null;
              })
              .addCase(CreatePost.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
                state.error = null;
              })
              .addCase(CreatePost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || action.error.message;
              });
    }
})

export default postSlice.reducer;