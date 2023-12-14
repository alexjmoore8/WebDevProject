import React from 'react';
import {useLocation, Link} from 'react-router-dom';
import Navbar from './Navbar.js';
import "./loginRegister/css/pretty.css"

function Home(){
    const location=useLocation();


    return (
        <div className="homepage">
            <Navbar /> {/* Include the Navbar component */}

            <h1>Hello {location.state?.id} and welcome to Resume Builder</h1>

            <p className="helper-text">
                <Link to="/">Logout</Link>
            </p>

        </div>
    )
}

export default Home;