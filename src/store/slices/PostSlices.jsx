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


const 