import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import RecentActivity from "../components/RecentActivity";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        await axios.get("http://127.0.0.1:8000/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Token invalid or backend down", err);
        localStorage.removeItem("access_token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <p>Loading...</p>;

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
