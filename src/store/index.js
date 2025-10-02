// store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";

const store = configureStore({
  reducer: {
    users: searchReducer,
  },
});

export default store;
