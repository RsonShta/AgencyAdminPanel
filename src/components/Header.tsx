import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, role, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState<{ text: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes("/app/suppliers")) return "Supplier Management";
    if (path.includes("/app/users")) return "User Management";
    if (path.includes("/app/agencies")) return "Agency Management";
    if (path.includes("/app/api-test")) return "Test API";
    if (path.includes("/app/booking")) return "Booking Management";
    if (path.includes("/app/overview")) return "Dashboard";
    return "Admin Panel";
  };

  const showMessage = (message: string, type: 'success' | 'error' | 'warning') => {
    setLogoutMessage({ text: message, type });

    // Clear message after 5 seconds
    setTimeout(() => {
      setLogoutMessage(null);
    }, 5000);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutMessage(null);

    try {
      await logout(() => {
        navigate("/auth/login");
      }, showMessage);
    } catch (error) {
      // This shouldn't happen as logout handles errors internally
      console.error("Unexpected logout error:", error);
      setLogoutMessage({ text: "An unexpected error occurred during logout", type: 'error' });
    } finally {
      setIsLoggingOut(false);
    }
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
          👤 {username || "Guest"} ({role || "N/A"})
        </span>
        <DarkModeToggle />

        {/* Logout Status Message */}
        {logoutMessage && (
          <div
            style={{
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              backgroundColor: logoutMessage.type === 'success' ? '#d4edda' : logoutMessage.type === 'error' ? '#f8d7da' : '#fff3cd',
              color: logoutMessage.type === 'success' ? '#155724' : logoutMessage.type === 'error' ? '#721c24' : '#856404',
              border: `1px solid ${logoutMessage.type === 'success' ? '#c3e6cb' : logoutMessage.type === 'error' ? '#f5c6cb' : '#ffeaa7'}`,
            }}
          >
            {logoutMessage.text}
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: isLoggingOut ? "#ccc" : "#e63946",
            color: "#fff",
            fontWeight: 500,
            cursor: isLoggingOut ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            if (!isLoggingOut) e.currentTarget.style.backgroundColor = "#d62828";
          }}
          onMouseLeave={(e) => {
            if (!isLoggingOut) e.currentTarget.style.backgroundColor = "#e63946";
          }}
        >
          {isLoggingOut ? (
            <>
              <span
                style={{
                  fontSize: "12px",
                  display: "inline-block",
                  animation: "spin 1s linear infinite",
                  transformOrigin: "center",
                }}
              >
                ⏳
              </span>
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
