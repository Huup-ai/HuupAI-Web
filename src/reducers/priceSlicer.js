import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
  name: "price",
  initialState: {
    price: 0
  },
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    }
  },
});

export const { setPrice } = priceSlice.actions;  // Export the new action
export const priceReducer = priceSlice.reducer;
