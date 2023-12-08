//define routes for the app to use
import React from 'react';
import Home from './components/Home.js';
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import Resume from './components/resume/resumeForm/resumeForm.js';
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
            <Route path = "/resume-form" element={<Resume/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
