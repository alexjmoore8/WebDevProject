
import React, { useState } from 'react';
import "./jscss/jobearch.css"
import Navbar from './Navbar.js';

 function JobSearchEngine() {
  const [keywords, setKeywords] = useState('');
  const [location, setLocation] = useState('');
  const [jobResults, setJobResults] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // API for job search
    const url = 'https://jooble.org/api/';
    const key = 'b012952b-e896-469e-a4b1-2bffcd6e5af0';

    const params = {
      keywords: keywords,
      location: location,
    };

    try {
      const response = await fetch(url + key, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        const data = await response.json();
        setJobResults(data.jobs);
      } else {
        console.error('Error fetching job results');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
     <Navbar/> 
    <div>
      
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

        <button type="submit">Search Jobs</button>
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
    </>
  );
}

export default JobSearchEngine;