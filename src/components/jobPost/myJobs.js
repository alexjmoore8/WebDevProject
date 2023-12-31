import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/jobPost.css';

export function MyJobs() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [expandedJobId, setExpandedJobId] = useState(null);

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        try {
            const response = await axios.get("http://localhost:3000/myJobs", { withCredentials: true });
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching my job postings", error);
        }
    }

    function handleJobClick(jobId) {
        if (expandedJobId === jobId) {
            setExpandedJobId(null);
        } else {
            setExpandedJobId(jobId);
        }
    }

    function handleBackClick() {
        navigate(-1);
    }

    return (
        <div className='jobList'>
            <h1>My Job Postings</h1>
            <ul>
                {jobs.map((job) => (
                    <li key={job._id} className="jobItem" onClick={() => handleJobClick(job._id)}>
                        <div>
                            <div className="jobListItem">
                                <div className={`caret ${expandedJobId === job._id ? 'expanded' : ''}`}>&#9660;</div>
                                <h2>{job.title} - {job.companyName}</h2>
                            </div>
                            {expandedJobId === job._id && (
                                <div>
                                    <p>Description: {job.description}</p>
                                    <p>City: {job.city}</p>
                                    <p>State: {job.state}</p>
                                    <p>Salary: {job.salary}</p>
                                    <p>Tags: {job.tags.join(', ')}</p>
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

export default MyJobs;
