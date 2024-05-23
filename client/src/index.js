import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import axios from "axios";
axios.interceptors.request.use(function (config) {
  const token = "bearer " + window.localStorage.accessToken;
  config.headers.Authorization = token;

  return config;
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
