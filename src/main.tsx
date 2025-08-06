import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/login.css";
import "./styles/dashboard.css";

import { AuthProvider } from "./context/AuthContext";
import { AgencyProvider } from "./context/AgencyContext";
import { SupplierProvider } from "./context/SupplierContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AgencyProvider>
        <SupplierProvider>
          <App />
        </SupplierProvider>
      </AgencyProvider>
    </AuthProvider>
  </React.StrictMode>
);
