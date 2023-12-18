import React, { useEffect, useState } from 'react';
import Controller from './resume//dynamicResume.js';
import axios from "axios";
// import './css/resumeList.css';

export function ResumeList() {
    const [resumes, setResumes] = useState([]);

    useEffect(() => {
        getResumes();
    }, []);

    async function getResumes() {
        try {
            const response = await axios.get("http://localhost:3000/resumes", { withCredentials: true });
            console.log(response.data)
            setResumes(response.data);
        } catch (error) {
            console.error("Error fetching resumes", error);
        }
    }

    return (
        <div className='resumeList'>
            <h1>List of Resumes</h1>
            <ul>
                {resumes.map((resume) => (
                    <li key={resume._id} className="resumeItem">
                        <h2>{resume._id}</h2>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ResumeList;
