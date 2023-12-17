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
        <button className="toggle-button" onClick={() => setJobSearchToggle(!jobSearchToggle)}>
          {jobSearchToggle ? 'Outside Job Search' : 'Site Job Search'}
        </button>
        {jobSearchToggle ? <JobSearchForm /> : <JobSearchEngine />}
      </div>
      <div className="toggle-group">
        <button className="toggle-button" onClick={() => setSalaryCalculatorToggle(!salaryCalculatorToggle)}>
          {salaryCalculatorToggle ? 'Salary Calculator Off' : 'Salary Calculator On'}
        </button>
        {salaryCalculatorToggle ? <SalaryToggle /> : <></>}
      </div>
    </div>
    </>
  );
}

export default ToggleButton;
