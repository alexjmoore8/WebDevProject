import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumeDropdown from './resumeDropdown.js';

const ApplyJobPage = () => {
  const location = useLocation();
  const { job } = location.state || {};


  // TODO handle submit button click
  const handleSubmitClick = () => {
    // limit number of clicks to 1
    // send resume to backend
    // send job to backend
    // send application to backend
    // navigate back to job search page
    console.log('submit button clicked');
  }

  return (
    <div>
      <div className='jobInfo'>
      <h1>Job Application</h1>
      {job ? (
        <div>
          <h2>{job.title} - {job.companyName}</h2>
          <p>Description: {job.description}</p>
          <p>City: {job.city}</p>
          <p>State: {job.state}</p>
          <p>Salary: {job.salary}</p>
          <p>Tags: {job.tags.join(', ')}</p>
        </div>
      ) : (
        <p>Job details not available</p>
      )}
      </div>
      <div className='application'>
        <h2>Choose Resume</h2>
        <ResumeDropdown />
        <button className='submit' onClick={handleSubmitClick}>Submit</button>
        </div>
    </div>
  );
};

export default ApplyJobPage;
