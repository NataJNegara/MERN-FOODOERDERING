import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
import "./axiosConfig.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./interceptors/authInterceptors.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer position="bottom-right" />
    </Provider>
  </React.StrictMode>
);
