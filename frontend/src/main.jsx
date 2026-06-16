import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FinanceProvider } from "./context/FinanceContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <FinanceProvider>
          <App />
          <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </FinanceProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
