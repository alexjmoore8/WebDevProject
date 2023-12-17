import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/jobPost.css';
import Navbar from '../Navbar.js';


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
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!salary.match(/^\d+$/)) {
            setError('Salary must be a number.');
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
                setError("Error posting job: " + response.data.message);
            }
        } catch (error) {
            console.error("Error posting job", error);
            setError("Error posting job: " + (error.response?.data?.message || error.message));
        }
    }

    function handleBackClick() {
        navigate(-1);
    }

    const handleTagChange = (e) => {
        setTags(e.target.value);
    };

    const handleTagKeyDown = (e) => {
        if (e.key === ' ') {
            e.preventDefault(); // Prevent default space behavior
            const value = tags.trim() + ', '; // Add comma and space after the tag
            setTags(value);
        }
    };

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
        <select value={state}
            onChange={(e) => setState(e.target.value)} 
            required 
            >
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
        </select>

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
                        onChange={handleTagChange}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Tags"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
                {error && <p className="error">{error}</p>} {/* Display error messages */}
                <button onClick={handleBackClick} className="back-button">Back</button>
            </div>
        </div>
    );
}

export default JobPost;
