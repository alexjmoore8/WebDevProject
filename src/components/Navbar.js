import React from "react";
import { Link } from "react-router-dom";
import '../App.css';

import { useAuth } from './AuthContext.js'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const { logout, auth } = useAuth();
    const navigate = useNavigate();

    console.log(auth)

    const handleLogout = () => {
        logout(); // Reset the authentication state
        navigate('/'); // Navigate to the login page or home page after logout
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                {
                    auth.role === 'applicant' && (
                        <>
                            <li><Link to="/Home">Home</Link></li>
                            <li><Link to="/resume/form">Create a Resume</Link></li>
                            <li><Link to="/resume/myResume">View my resumes</Link></li>

                        </>
                    )
                }
                
                {
                    auth.role === 'employer' && (
                        <>
                            <li><Link to="/HomeA">Home</Link></li>
                            <li><Link to="/job/post">Create Job Post</Link></li>
                            <li><Link to="/job/myJobs">My Job Posts</Link></li>
                        </>
                    )
                }
                <li><Link to="/job/search">Job Search</Link></li>
                <li><Link to="/job/List">Job List</Link></li>
                <li><Link to="/tools/salaryChecks">Salary Tools</Link></li>

                <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>

            </ul>



        </nav>
    );
}

export default Navbar;

// make link to jobpost only accessible when login is employer
