import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import "./styles/theme.css";

import { AuthProvider } from "./context/AuthContext";
import { FinanceProvider } from "./context/FinanceContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <FinanceProvider>
          <App />
        </FinanceProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);