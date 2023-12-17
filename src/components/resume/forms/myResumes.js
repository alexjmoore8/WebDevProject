import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/myResumes.css';

function UserResumes() {
    const [resumes, setResumes] = useState([]);
    const [error, setError] = useState('');
    const [expandedResumeId, setExpandedResumeId] = useState(null);
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

    const handleResumeClick = (id) => {
        setExpandedResumeId(expandedResumeId === id ? null : id);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='resumeList'>
            <h1>My Resumes</h1>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume._id} className="resumeItem" onClick={() => handleResumeClick(resume._id)}>
                        <div>
                            <div className="resumeListItem">
                                <div className={`caret ${expandedResumeId === resume._id ? 'expanded' : ''}`}>&#9660;</div>
                                <h2>{resume.controller?.resumeTitle}</h2>
                            </div>
                            {expandedResumeId === resume._id && (
                                <div>
                                    {/* Render more details of the resume here */}
                                    <p>Contact: {resume.contact?.email}</p>
                                    <p>About: {resume.about?.summary}</p>
                                    {/* Add more fields as per your schema */}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
    );
}

export default UserResumes;
