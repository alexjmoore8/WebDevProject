import React, { useState } from 'react';
import JobSearchEngine from './jobsearch.js';
import JobSearchForm from './jobSearchForm.js';
import RankedJobs from './rankedJobs.js';

function ToggleButton() {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'Outside Job Search' : 'Site Job Search'}
        </button>
      {toggle ? <JobSearchForm /> : <JobSearchEngine />}
    </div>

  );
}

export default ToggleButton;