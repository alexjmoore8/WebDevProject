import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.js'; // Import useAuth hook from AuthContext

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const { auth } = useAuth(); // Retrieve auth state using useAuth

  console.log('Protected Route Check - Authenticated:', auth.isAuthenticated, 'Role:', auth.role, 'Required Role:', role);

  if (!auth.isAuthenticated) {
    // If user is not authenticated, redirect to login page
    console.log('Redirecting to login, not authenticated');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role && auth.role !== role) {
    // If user does not have the required role, redirect to a not-authorized route
    console.log('Redirecting to not-authorized, role mismatch');
    return <Navigate to="/not-authorized" replace />;
  }

  // If user is authenticated and has the required role, render the children components
  return children;
};

export default ProtectedRoute;
