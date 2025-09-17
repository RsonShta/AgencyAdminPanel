import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // User is authenticated but does not have the required role
    // You might want to redirect to an unauthorized page or dashboard
    return <Navigate to="/app/overview" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
