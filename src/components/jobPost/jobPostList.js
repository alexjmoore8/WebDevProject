import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApplyButton from '../applyJob/applyButton.js';
import './css/jobPost.css'; // Import your CSS file for styles
import Navbar from '../Navbar.js';

export function JobPostList() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [expandedJobId, setExpandedJobId] = useState(null);

    useEffect(() => {
        getJobs();
    }, []);

    async function getJobs() {
        try {
            const response = await axios.get("http://localhost:3000/jobs", { withCredentials: true });
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching job posts", error);
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
            <Navbar/>
            <h1>Available Job Listings</h1>
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
                                    <ApplyButton jobId={job._id} job={job}/>
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

export default JobPostList;
