import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext.js'; 

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const { auth, login, logout } = useAuth(); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/verify-auth');
        if (response.data && response.data.status === "authenticated") {
          login(response.data.user.role); // Use login function to set auth state
        } else {
          logout();
        }
        setIsLoading(false);
      } catch (error) {
        logout();
        setIsLoading(false);
      }
    };

    if (!auth.isAuthenticated) {
      verifyAuth();
    } else {
      setIsLoading(false);
    }
  }, [auth.isAuthenticated, login, logout]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth.isAuthenticated) {
    console.log('Redirecting to login, not authenticated');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role && auth.role !== role) {
    console.log('Redirecting to not-authorized, role mismatch');
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
