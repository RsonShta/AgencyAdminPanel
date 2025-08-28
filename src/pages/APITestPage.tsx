import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import APITable from "../components/APITable";
import "../styles/api-test.css";

export default function APITest() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <APITable />
      </div>
    </div>
  );
}
