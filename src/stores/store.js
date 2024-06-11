// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
