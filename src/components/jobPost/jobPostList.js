import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function JobPostList() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        try {
            const response = await axios.get("http://localhost:3000/jobs", { withCredentials: true });
            console.log(response.data);
            setJobs(response.data);
        } catch (error) {
            setMessage("Error during login");
        }
    }

    function handleBackClick() {
        navigate(-1); 
    }

    return (
        <div className='jobList'>
            <h1>Available Job Listings</h1>
            <ul>
                {jobs.map((job, i) => (
                    <li key={i}>
                        <div>
                            <h2>{job.title} - {job.companyName}</h2>
                            <p>{job.description}</p>
                            <p>{job.requirements}</p>
                        </div>
                    </li>
                ))}
            </ul>
            {message && <p className={`message error-message`}>{message}</p>}
            <button onClick={handleBackClick} className="back-button">Back</button>
        </div>
    );
}

export default JobPostList;
