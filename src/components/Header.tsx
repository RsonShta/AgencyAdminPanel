import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const { username } = useAuth();

  const getTitle = () => {
    const path = location.pathname;
    console.log("Current path:", path); // For debugging

    if (path.includes("/dashboard") && path.includes("suppliers")) return "Supplier Management";
    if (path.includes("/users")) return "User Management";
    if (path.includes("/agencies")) return "Agency Management";
    if (path.includes("/dashboard") && path.includes("apitest")) return "Test API";
    if (path.includes("/booking")) return "Booking Management";
    if (path.includes("/dashboard")) return "Dashboard";

    return "Admin Panel";
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>{getTitle()}</h1>
      </div>
      <div className="header-right" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <span className="admin-name" role="img" aria-label="admin">
          👤 {username || "Super Admin"}
        </span>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;