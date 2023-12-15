//define routes for the app to use
import React from 'react';
import Home from './components/Home.js';
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import ResumeForm from './components/resume/forms/resumeForm.js';
import Controller from './components/resume/resumeController.js';
import JobSearchEngine from './components/jobsearch.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path = "/" element={<Login/>}/>
            <Route path = "/signup" element={<Signup/>}/>
            <Route path = "/home" element={<Home/>}/>
            <Route path = "/resume/form" element={<ResumeForm/>}/>
            <Route path = "/resume/layout" element={<Controller/>}/>
            <Route path = "/jobsearch" element={<JobSearchEngine/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
