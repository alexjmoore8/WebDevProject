import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/jobPost.css';

export function JobPost() {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [salary, setSalary] = useState('');
    const [tags, setTags] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        if (isNaN(salary) || salary.trim() === '') {
            setMessage("Salary must be a number.");
            return;
        }

        if (!tags.includes(',')) {
            setMessage("Tags should be comma-separated.");
            return;
        }

        const jobData = {
            companyName,
            title,
            description,
            city,
            state,
            salary,
            tags: tags.split(',').map(tag => tag.trim())
        };

        try {
            const response = await axios.post("http://localhost:3000/jobs", jobData, { withCredentials: true });
            if (response.status === 201) {
                setMessage("Job posted successfully.");
                setTimeout(() => navigate('/HomeA'), 2000);
            } else {
                setMessage("Error posting job: " + response.data.message);
            }
        } catch (error) {
            console.error("Error posting job", error);
            setMessage("Error posting job: " + error.message);
        }
    }

    function handleBackClick() {
        navigate(-1);
    }

    return (
        <div className="container">
            <div className="form-box">
                <h1>Post a Job</h1>
                <form onSubmit={handleSubmit}>
                <label htmlFor="companyName">Company Name:</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Company Name"
                        required
                    />
                    
                    <label htmlFor="title">Job Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Job Title"
                        required
                    />

                    <label htmlFor="description">Job Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Job Description"
                        required
                    />

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required
                    />

                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        required
                    />

                    <label htmlFor="salary">Salary:</label>
                    <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Salary"
                        required
                    />

                    <label htmlFor="tags">Tags (comma-separated):</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Tags"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
                <button onClick={handleBackClick} className="back-button">Back</button>
            </div>
        </div>
    );
}

export default JobPost;
