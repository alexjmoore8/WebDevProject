import React, { useState } from 'react';
import JobSearchEngine from './jobsearch.js';
import JobSearchForm from './jobSearchForm.js';
import RankedJobs from './rankedJobs.js';
import SalaryToggle from '../salaryCalculator/salaryToggle.js';
import './css/jobsearch.css';
import Navbar from '../Navbar.js';

function ToggleButton() {
  const [jobSearchToggle, setJobSearchToggle] = useState(false);
  const [salaryCalculatorToggle, setSalaryCalculatorToggle] = useState(false);

  return (
  <>
    <Navbar />
    <div className="container">
      <div className="toggle-group">
        <label>Change Tools:</label>
        <button className="toggle-button" onClick={() => setJobSearchToggle(!jobSearchToggle)}>
          {jobSearchToggle ? 'Full Internet Job Search' : 'Members Only Job Search'}
        </button>
        {jobSearchToggle ? <JobSearchForm /> : <JobSearchEngine />}
      </div>
    </div>
    </>
  );
}

export default ToggleButton;
