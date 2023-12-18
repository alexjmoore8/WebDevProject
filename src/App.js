import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext.js'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute.js'; // Import ProtectedRoute
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import Home from './components/Home.js'; // Import Home component for applicants
import HomeA from './components/HomeA.js'; // Import HomeA component for employers
// import { JobSearchForm } from './components/JobSearch/jobSearchForm.js'; // Import JobSearchForm
import ResumeForm from './components/resume/forms/resumeForm.js';
import DynamicResume from './components/resume/dynamicResume.js';
import { JobPost } from './components/jobPost/jobPost.js';
import { JobPostList } from './components/jobPost/jobPostList.js';
import NotAuthorized from './components/NotAuthorized.js';
// import JobSearchEngine from './components/JobSearch/jobsearch.js';
import SalaryToggle from './components/salaryCalculator/salaryToggle.js';
import { MyJobs } from './components/jobPost/myJobs.js';
import RankedJobs from './components/JobSearch/rankedJobs.js';
import ToggleButton from './components/JobSearch/jobSearchToggle.js';
import MyResumes from './components/resume/forms/myResumes.js';
import { ResumeProvider } from './components/resume/ResumeContext.js';
import ApplyJob from './components/applyJob/applyJob.js';
import ResumeList from './components/resumeListView.js';


function App() {
  return (

    <AuthProvider> {/* Wrap the application with AuthProvider */}
    <ResumeProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="/Home" element={<ProtectedRoute role="applicant"><Home />
            </ProtectedRoute>
          } />
          <Route path="/HomeA" element={
            <ProtectedRoute role="employer"><HomeA />
            </ProtectedRoute>
          } />
          <Route path = "/resume/form" element={
            <ProtectedRoute role="applicant"><ResumeForm />
            </ProtectedRoute>}/>
          
          <Route path = "/resume/layout" element={
            <ProtectedRoute role="applicant"><DynamicResume/>
            </ProtectedRoute>} />

            <Route path = "/resume/myResume" element={
            <ProtectedRoute role="applicant"><MyResumes/>
            </ProtectedRoute>} />

          <Route path="/job/post" element={
            <ProtectedRoute role="employer">
              <JobPost />
            </ProtectedRoute>
          } />
          {/* <Route path="/jobSearch" element={<JobSearchForm />} /> */}

          <Route path="job/myJobs" element={
            <ProtectedRoute role="employer">
              <MyJobs />
            </ProtectedRoute>
          } />

          <Route path="/resumeList" element={<ProtectedRoute role="emplyer"><ResumeList /></ProtectedRoute>} />

          <Route path="/job/list" element={<JobPostList />} />
          <Route path="tools/salaryChecks" element={<SalaryToggle />} />
          {/* <Route path = "/outsideJobSearch" element={<JobSearchEngine/>}/> */}
          <Route path="/applicant/rankedJobs" element={<RankedJobs />} />
          <Route path="job/search" element={<ToggleButton />} />
          <Route path="/job/apply" element={<ApplyJob />} />
        </Routes>
      </Router>
    </ResumeProvider>
    </AuthProvider>
  );
}

export default App;
