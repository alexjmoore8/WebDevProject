import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext.js'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.js'; // Import ProtectedRoute
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import Home from './components/Home.js'; // Import Home component for applicants
import HomeA from './components/HomeA.js'; // Import HomeA component for employers
import { JobPost } from './components/jobPost.js';
import { JobPostList } from './components/jobPostList.js';
import { JobSearchForm } from './components/jobSearchForm.js'; // Import JobSearchForm

function App() {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={
            <ProtectedRoute role="applicant">
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/HomeA" element={
            <ProtectedRoute role="employer">
              <HomeA />
            </ProtectedRoute>
          } />
          {/* Define other routes here */}
          <Route path="/jobPost" element={
            <ProtectedRoute role="employer">
              <JobPost />
            </ProtectedRoute>
          } />
          <Route path="/jobList" element={
            <JobPostList />
          } />
          <Route path="/jobSearch" element={<JobSearchForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
