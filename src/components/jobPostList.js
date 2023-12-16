import './loginRegister/css/jobList.css';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from './AuthContext.js';



export function JobPostList() {

    const [jobs, setJobs] = useState([])
    const [message, setMessage] = useState('');


    useEffect(() => {
        getJobs()
    }, [])

    async function getJobs(e) {

        try {
            const response = await axios.get("http://localhost:3000/getJobPosts", { withCredentials: true });
            console.log(response.data);
            setJobs(response.data)

        } catch (error) {
            setMessage("Error during login");
        }
    }

    return (
        <div className='jobList'>
        <><h1> Available Job Listings</h1>
            <ul>
                {jobs.map((job, i) => {
                    return <li key={i}>
                        <div>
                            <h1>
                                {job.title} -  {job.companyName}
                            </h1>
                            <p>
                                {job.description}
                            </p>
                        </div>
                    </li>;

                })}
                {message && <p className={`message error-message`}>{message}</p>}
                <p className="helper-text">
                    Want to go back? <Link to="/HomeA">Home</Link>
                </p>
            </ul></>
            </div>
    );

}

//if login = user make link to /Home, if login = employer make link /HomeA