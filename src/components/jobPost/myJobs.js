import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './css/myJobs.css';

export function MyJobs() {
    const navigate = useNavigate(); // Hook for navigation
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        try {
            const response = await axios.get("http://localhost:3000/myJobs", { withCredentials: true });
            if (response.status === 200) {
                setJobs(response.data);
            } else {
                setMessage("Failed to retrieve job postings");
            }
        } catch (error) {
            setMessage("Error fetching job postings: " + error.message);
        }
    }

    function handleBackClick() {
        navigate(-1);
    }

    return (
        <div>
            <h1>My Job Postings</h1>
            {jobs.length > 0 ? (
                <ul>
                    {jobs.map((job, index) => (
                        <li key={index}>
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong> {job.companyName}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Location:</strong> {job.city}, {job.state}</p>
                            <p><strong>Salary:</strong> {job.salary}</p>
                            <p><strong>Tags:</strong> {job.tags.join(', ')}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No job postings found.</p>
            )}
            {message && <p className="message error-message">{message}</p>}
            <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
    );
}

export default MyJobs;
