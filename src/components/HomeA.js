import React from 'react';
import { useAuth } from './AuthContext.js'; // Adjust the path according to your file structure
import Navbar from './Navbar.js';
import { Link } from "react-router-dom";
import "./homePage.css"
const Home = () => {
    const { auth } = useAuth();

    return (
        <div className="homepage">
            <Navbar />
            <h1>Welcome to the Employer Homepage!</h1>

            <div className="homepage-bio">
                <p>Welcome to our beta stage web application, designed to connect you with your dream job. 
                   For job seekers, we streamline the resume creation process, breaking it down into manageable 
                   steps and guiding you on what information is essential. For employers, we offer access to 
                   a curated selection of top talent. Our goal is to make the job matching process as efficient 
                   and effective as possible for both parties.</p>
            </div>

            <div className="home-buttons">
                {/* Conditional rendering based on the user role */}
                {auth.role === 'applicant' && (
                    <div className="applicant-buttons">
                        <Link to="/resume/form" className="home-link-button">Create a Resume</Link>
                        <Link to="/resume/myResume" className="home-link-button">View My Resumes</Link>
                    </div>
                )}

                {auth.role === 'employer' && (
                    <div className="employer-buttons">
                        <Link to="/job/post" className="home-link-button">Post a Job</Link>
                        <Link to="/job/myJobs" className="home-link-button">My Job Posts</Link>
                    </div>
                )}

                {/* Common links */}
                <Link to="/job/search" className="home-link-button">Job Search</Link>
                <Link to="/job/List" className="home-link-button">Job List</Link>
                <Link to="/tools/salaryChecks" className="home-link-button">Salary Tools</Link>
            </div>
        </div>
    );
};

export default Home;
