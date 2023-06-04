import React from "react";
// import ReactDom from "react-dom/lient";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
// import "bulma/css/bulma.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "./components/style.css";

axios.defaults.withCredentials = true;

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
