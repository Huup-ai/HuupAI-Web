import { createSlice } from "@reduxjs/toolkit";

const priceSlice = createSlice({
  name: "price",
  initialState: {
    price: 0,
    provider: "none",
  },
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action.payload;
    }

  },
});

export const { setPrice,setProvider } = priceSlice.actions;  // Export the new action
export const priceReducer = priceSlice.reducer;
