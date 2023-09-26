import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    hasPaymentMethod: true,  // New state property
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    addPaymentMethod: (state) => {  // New reducer
      state.hasPaymentMethod = true;
    },
  },
});

export const { loginSuccess, addPaymentMethod } = authSlice.actions;  // Export the new action
export const authReducer = authSlice.reducer;
