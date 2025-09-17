import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import RecentActivity from "../components/RecentActivity";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, accessToken } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/auth/login");
    } else if (!authLoading && isAuthenticated) {
      setLoading(false);
    }
  }, [navigate, isAuthenticated, authLoading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="dashboard-cards">
          <StatsCards />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
