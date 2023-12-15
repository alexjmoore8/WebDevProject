
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";


export function MyJobs() {

    const [jobs, setJobs] = useState([])
    const [message, setMessage] = useState('');


    useEffect(() => {
        getJobs()
    }, [])

    async function getJobs(e) {

        try {
            const response = await axios.get("http://localhost:3000/myJobs", { withCredentials: true });
            console.log(response.data);
            setJobs(response.data)

        } catch (error) {
            setMessage("Error during login");
        }
    }

    return (
        <><h1> My Job Postings</h1>
            <ul>
                {jobs.map((job, i) => {
                    return <li key={i}>
                        {job.title}
                    </li>;

                })}
                {message && <p className={`message error-message`}>{message}</p>}
                <p className="helper-text">
                    Want to go back? <Link to="/HomeA">Home</Link>
                </p>
            </ul></>

    );

}

//if login = user make link to /Home, if login = employer make link /HomeA