import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useAuth();

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("/dashboard") && path.includes("suppliers")) return "Supplier Management";
    if (path.includes("/users")) return "User Management";
    if (path.includes("/agencies")) return "Agency Management";
    if (path.includes("/dashboard") && path.includes("apitest")) return "Test API";
    if (path.includes("/booking")) return "Booking Management";
    if (path.includes("/dashboard")) return "Dashboard";
    return "Admin Panel";
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>{getTitle()}</h1>
      </div>
      <div
        className="header-right"
        style={{ display: "flex", alignItems: "center", gap: "20px" }}
      >
        <span className="admin-name" role="img" aria-label="admin">
          👤 {username || "Super Admin"}
        </span>
        <DarkModeToggle />
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#e63946", // red color
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d62828")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e63946")}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
