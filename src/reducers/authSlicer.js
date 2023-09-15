// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
  },
});

export const { loginSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
