import { configureStore } from "@reduxjs/toolkit";
import {authReducer, selectionReducer} from "./reducers/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    selection: selectionReducer,
  },
});

export default store;
