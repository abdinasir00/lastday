// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/auth";


const store = configureStore({
  reducer: {
    users: searchReducer,
    auth: authReducer, 
  },
});

export default store;
