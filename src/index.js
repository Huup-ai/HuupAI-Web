// index.js

import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authSlicer";
import { priceReducer } from "./reducers/priceSlicer";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { BrowserRouter as Router } from "react-router-dom"; // make sure only one router

const store = configureStore({
  reducer: {
    auth: authReducer,
    price: priceReducer
  },
});

ReactDOM.render(
  <ContextProvider>
    <CookiesProvider>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </CookiesProvider>
  </ContextProvider>,
  document.getElementById("root")
);
