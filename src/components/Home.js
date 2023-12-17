import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar.js';
import axios from 'axios'; // Make sure to install axios using npm or yarn

function Home() {
    const location = useLocation();
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/resumes')
            .then(response => {
                setResumes(response.data);
            })
            .catch(error => {
                console.error('Error fetching resumes:', error);
            });
    }, []);

    return (
        <div className="homepage">
            <Navbar />

            <h1>Hello {location.state?.id} and welcome to Resume Builder</h1>

            {/* Display resumes */}
            <div className="resumes">
                {resumes.map(resume => (
                    <div key={resume._id}>
                        <h3>{resume.controller.resumeTitle}</h3>
                        {/* Display other resume details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
