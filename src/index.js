import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { ToggleProvider } from "./Hooks/UseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ToggleProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </ToggleProvider>
);
