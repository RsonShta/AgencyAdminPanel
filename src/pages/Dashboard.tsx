import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import RecentActivity from "../components/RecentActivity";
import "../styles/dashboard.css";

export default function Dashboard() {
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
