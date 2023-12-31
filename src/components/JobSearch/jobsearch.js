import React, { useState } from 'react';
import './css/jobsearch.css';
import Navbar from '../Navbar.js';
import $ from 'jquery'; // Import jQuery

function JobSearchEngine() {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [jobResults, setJobResults] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // API for job search
    const apiUrl = 'https://jooble.org/api/';
    const apiKey = 'b012952b-e896-469e-a4b1-2bffcd6e5af0';

    const requestData = {
      keywords: keywords,
      location: location,
    };

    $.ajax({
      url: `${apiUrl}${apiKey}`,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestData),
      success: function (data) {
        setJobResults(data.jobs);
      },
      error: function () {
        console.error('Error fetching job results');
      },
    });
  };

  return (
      <div className="jobContainer">
        <div className="form-box">
        <h1>Job Search Engine</h1>
        <form onSubmit={handleFormSubmit} id="jobSearchForm">
          <label htmlFor="keywords">Keywords:</label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <button className="searchButton" type="submit">Search</button>
        </form>

        <div id="jobResults">
          {jobResults.length > 0 ? (
            <ul id="jobSearchResults">
              {jobResults.map((job, index) => (
                <li key={index}>
                  <a href={job.link} target="_blank" rel="noopener noreferrer">
                    {job.title}
                  </a>{' '}
                  - {job.company} - {job.location}
                </li>
              ))}
            </ul>
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
        </div>
      </div>
  );
}

export default JobSearchEngine;
