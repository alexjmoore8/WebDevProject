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
import { JobPost } from './components/jobPost/jobPost.js';
import { JobPostList } from './components/jobPost/jobPostList.js';
import NotAuthorized from './components/NotAuthorized.js';
import JobSearchEngine from './components/jobsearch.js';
import SalaryCalculator from './salaryCalculator/salaryCalculator.js';
import SalaryMetric from './salaryCalculator/salaryMetric.js';
import { MyJobs } from './components/jobPost/myJobs.js';
import RankedJobs from './components/applicant/rankedJobs.js';


function App() {
  return (
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/Home" element={<ProtectedRoute role="applicant"><Home />
            </ProtectedRoute>
          } />
          <Route path="/HomeA" element={
            <ProtectedRoute role="employer">
              <HomeA />
            </ProtectedRoute>
          } />
          <Route path = "/resume/form" element={<ResumeForm/>} />
          <Route path = "/resume/layout" element={<DynamicResume/>} />
          <Route path="/jobPost" element={
            <ProtectedRoute role="employer">
              <JobPost />
            </ProtectedRoute>
          } />
          <Route path="/myJobs" element={
            <ProtectedRoute role="employer">
              <MyJobs />
            </ProtectedRoute>
          } />
          <Route path="/jobList" element={<JobPostList />} />
          <Route path="/salaryCalculator" element={<SalaryCalculator />} />
          <Route path="/salaryMetric" element={<SalaryMetric />} />
          <Route path = "/jobsearch" element={<JobSearchEngine/>}/>
          <Route path="/applicant/rankedJobs" element={<RankedJobs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
