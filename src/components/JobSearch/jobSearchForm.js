import React, { useState } from 'react';
import $ from 'jquery'; // Ensure jQuery is installed
import { Link } from "react-router-dom";
import './css/jobSearchResults.css'; // This is where you import your CSS file
import { useAuth } from '../AuthContext.js'; // Adjust the path according to your file structure
import { useNavigate } from 'react-router-dom';
import RankedJobs from './rankedJobs.js';
import { set } from 'mongoose';

export function JobSearchForm() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [keyWords, setKeyWords] = useState('');
  const [salary, setSalary] = useState('');
  const [jobs, setJobs] = useState([]); // State to store search results
  const { auth } = useAuth();
  const homeRoute = auth.role === 'employer' ? "/HomeA" : "/Home";
  const [Message, setMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showRankedJobs, setShowRankedJobs] = useState(false);
  const navigate = useNavigate();
  
  const redirectToRecommendedJobs = () => {
    if (searchPerformed) {
      setSearchPerformed(false);
      setJobs([]);
    }
    setShowRankedJobs(!showRankedJobs);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Checking data type of salary, no check for String
    const salaryNumber = Number(salary);
    if (isNaN(salaryNumber)) {
        // Handle the error
        setJobs([]); // Clear any existing jobs
        setShowButton(false); // Hide the button
        setSuccessMessage(''); // Clear success message
        setShowButton(true);
        setMessage("Salary must be a number!");
        return; // Stop the function execution if wrong data type
    } else {
        setMessage(''); // Reset error message
          setShowButton(false);
    }

    const payload = {
        title,
        company,
        city,
        state,
        keyWords,
        salary
    }

    // AJAX request using jQuery
    $.ajax({
        url: "http://localhost:3000/searchJobs",
        type: "POST",
        data: JSON.stringify(payload),
        contentType: "application/json",
        success: (response) => {
            if (response.length === 0) {
                setJobs([]); // Clear any existing jobs
                setSuccessMessage(''); // Clear success message
                setShowButton(false); // Hide the button
                setMessage("No matched jobs");
            } else {
                setMessage(''); // Clear the no match message
                setSuccessMessage('Jobs found!'); // Set success message
                setShowButton(true); // Show the button
                setJobs(response); // Update state with search results
            }
            setSearchPerformed(true);
            setShowRankedJobs(false);
        },
        error: (error) => {
            console.error("Search error", error);
        }
    });
  };

  return (
      <div className="jobContainer">
        <div className="form-box">
          <h1>Job Search</h1>
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            {/* Company */}
            <label htmlFor="company">Company:</label>
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" />
            {/* Title */}
            <label htmlFor="title">Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional" />
            {/* City */}
            <label htmlFor="city">City:</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Required" />
            {/* State */}
            <label htmlFor="state">State:</label>
            <select value={state} onChange={(e) => setState(e.target.value)} required>
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
          <br /><br />
          <label htmlFor="keyWords">Key Words:</label>
          <input type="text" value={keyWords} onChange={(e) => setKeyWords(e.target.value)} placeholder="Optional" />
          <label htmlFor="salary">Salary:</label>
          <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Required: Minimum Annual Salary in USD" />

          <button className="searchButton" type="submit">Search</button>
        </form>
        {Message && <p className={`message error-message`}>{Message}</p>}
        {successMessage && <p className={`message success-message`}>{successMessage}</p>}

          <button className="rec-jobs-button" onClick={redirectToRecommendedJobs}>
          View Recommended Jobs
        </button>
        
        <p className="helper-text">
            Want to go back? <Link to={homeRoute}>Home</Link>
            </p>
        </div>

        <div className="search-results">
            {jobs.map(job => (
                <div key={job._id} className="job-result">
                    <p><strong>Title:</strong> {job.title}</p>
                    <p><strong>Company:</strong> {job.companyName}</p>
                    <p><strong>City:</strong> {job.city}</p>
                    <p><strong>State:</strong> {job.state}</p>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Keywords:</strong> {job.tags.join(', ')}</p>
                </div>
            ))}
      </div>
      {showRankedJobs && <RankedJobs />}
    </div>
  );
}
export default JobSearchForm;