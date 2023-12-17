import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/myResumes.css';
import { ResumeContext } from '../ResumeContext.js';

function UserResumes() {
    const [resumes, setResumes] = useState([]);
    const [error, setError] = useState('');
    const { setResumeData } = useContext(ResumeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/my-resumes', { withCredentials: true });
                setResumes(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchResumes();
    }, []);

    const handleTitleClick = (resume) => {
        setResumeData(resume); // Set the selected resume data in the context
        navigate('/resume/layout'); // Navigate to the DynamicResume route
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='resumeList'>
            <h1>My Resumes</h1>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume._id} className="resumeItem">
                        <div className="resumeListItem">
                            <h2 onClick={() => handleTitleClick(resume)}>{resume.controller?.resumeTitle}</h2>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate(-1)} className="back-button">Back</button>
        </div>
    );
}

export default UserResumes;
