//define routes for the app to use
// TODO: remove h1 from /resume/layout route
import React from 'react';
import Home from './components/Home.js';
import Login from './components/loginRegister/Login.js';
import Signup from './components/loginRegister/Signup.js';
import ResumeForm from './components/resume/forms/resumeForm.js';
import Controller from './components/resume/resumeController.js';
// import layout2 from './components/resume/templates/layout2.js';
// import layout3 from './components/resume/templates/layout3.js';
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
            <Route path = "/resume/form" element={<ResumeForm/>}/>
            <Route path = "/resume/layout" element={<Controller/>}/>
          </Routes>
        </Router>

    </div>
  );
}

export default App;
