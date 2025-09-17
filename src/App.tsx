import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import SuppliersPage from "./pages/SuppliersPage";
import UsersPage from "./pages/UsersPage";
import APITestPage from "./pages/APITestPage";
import AgencyPage from "./pages/AgencyPage";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import { AgencyProvider } from "./context/AgencyContext";
import { SupplierProvider } from "./context/SupplierContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AgencyProvider>
        <SupplierProvider>
          <Router>
            <Routes>
            {/* Redirects from old routes */}
            <Route path="/login" element={<Navigate to="/auth/login" />} />
            <Route path="/signup" element={<Navigate to="/auth/register" />} />
            <Route path="/dashboard" element={<Navigate to="/app/overview" />} />

            <Route element={<PublicRoute />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<SignupPage />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/app/overview" element={<Dashboard />} />
              <Route path="/app/suppliers" element={<SuppliersPage />} />
              <Route path="/app/api-test" element={<APITestPage />} />
              <Route path="/app/agencies" element={<AgencyPage />} />
              <Route path="/app/booking" element={<BookingPage />} />
            </Route>

            {/* Superadmin Protected Route */}
            <Route element={<ProtectedRoute allowedRoles={["superadmin"]} />}>
              <Route path="/app/users" element={<UsersPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/auth/login" />} />
            </Routes>
          </Router>
        </SupplierProvider>
      </AgencyProvider>
    </AuthProvider>
  );
};

export default App;
