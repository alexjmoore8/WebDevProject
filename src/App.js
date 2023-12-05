//define routes for the app to use
import React from 'react';
import Home from './components/Home.js';
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import JobSearchEngine from './components/jobSearch/jobsearch.js';
import AboutUsPage from './components/about.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <h1>Resume Builder</h1>

        <Router>
          <Routes>
            <Route path = "/" element={<Login/>}/>
            <Route path = "/signup" element={<Signup/>}/>
            <Route path = "/home" element={<Home/>}/>
            <Route path="/jobsearch" element={<JobSearchEngine/>}/>
            <Route path="/about" element={<AboutUsPage/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
