import React, { useState } from 'react';
import SalaryCalculator from './salaryCalculator.js';
import SalaryMetric from './salaryMetric.js';
import Navbar from '../Navbar.js';

function SalaryToggle() {
  const [toggle, setToggle] = useState(false);

  return (
    <>    
    <Navbar />
    <div className="container">
    <div className="toggle-group">
      <label>Change Tools:</label>
      <button className="toggle-button" onClick={() => setToggle(!toggle)}>
        {toggle ? 'Fair Salary Metric' : 'Salary Tax Calculator'}
        </button>
      {toggle ? <SalaryCalculator /> : <SalaryMetric />}
    </div>
    </div>
    </>
  );
}

export default SalaryToggle;

