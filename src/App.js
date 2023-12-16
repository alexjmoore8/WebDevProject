import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext.js'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.js'; // Import ProtectedRoute
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import Home from './components/Home.js'; // Import Home component for applicants
import HomeA from './components/HomeA.js'; // Import HomeA component for employers
import ResumeForm from './components/resume/forms/resumeForm.js';
import DynamicResume from './components/resume/dynamicResume.js';
import { JobPost } from './components/jobPost.js';
import { JobPostList } from './components/jobPostList.js';
import SalaryCalculator from './salaryCalculator/salaryCalculator.js';
import SalaryMetric from './salaryCalculator/salaryMetric.js';

function App() {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<ProtectedRoute role="applicant"><Home />
            </ProtectedRoute>
          } />
          <Route path="/HomeA" element={
            <ProtectedRoute role="employer">
              <HomeA />
            </ProtectedRoute>
          } />
          <Route path = "/resume/form" element={
          <ResumeForm/>
          } />
          <Route path = "/resume/layout" element={
          <DynamicResume/>
          } />
          <Route path="/jobPost" element={
            <ProtectedRoute role="employer">
              <JobPost />
            </ProtectedRoute>
          } />
          <Route path="/jobList" element={
            <JobPostList />
          } />
          <Route path="/salaryCalculator" element={<SalaryCalculator />} />
          <Route path="/salaryMetric" element={<SalaryMetric />} />
          <Route path = "/jobsearch" element={<JobSearchEngine/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
