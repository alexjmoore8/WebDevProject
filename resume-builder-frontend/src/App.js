import React from 'react';
import Home from './components/Home.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
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
          </Routes>
        </Router>

    </div>
  );
}

export default App;
