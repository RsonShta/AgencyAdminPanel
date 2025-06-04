import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import SuppliersPage from "./pages/SuppliersPage";
import UsersPage from "./pages/UsersPage";
import APITestPage from "./pages/APITestPage";
import AgencyPage from "./pages/AgencyPage";
import { AgencyProvider } from "./context/AgencyContext";
import BookingPage from "./pages/BookingPage";

const App: React.FC = () => {
  return (
    <AgencyProvider> {/* ✅ WRAP EVERYTHING INSIDE THIS */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/suppliers" element={<SuppliersPage />} />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/apitest" element={<APITestPage />} />
          <Route path="/dashboard/agencies" element={<AgencyPage />} />
          <Route path="/dashboard/booking" element={<BookingPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AgencyProvider>
  );
};

export default App;
