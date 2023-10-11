import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    externalWallet: false,
    hasPaymentMethod: true, 
    selectedOption: "eitherWay", // New state property
  },
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    addPaymentMethod: (state) => {  // New reducer
      state.hasPaymentMethod = true;
    },
  hasExternalWallet: (state) => {
    state.externalWallet = true;
  },
  updateSelection: (state, action) => {
    state.selectedOption = action.payload;
  },

  },
});

export const { logout, loginSuccess, addPaymentMethod, hasExternalWallet,updateSelection } = authSlice.actions;  // Export the new action
export const authReducer = authSlice.reducer;

