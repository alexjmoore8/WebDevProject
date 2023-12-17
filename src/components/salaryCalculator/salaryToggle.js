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
      <button className="toggle-button" onClick={() => setToggle(!toggle)}>
        {toggle ? 'Salary Tax Calculator' : 'Fair Salary Metric'}
        </button>
      {toggle ? <SalaryCalculator /> : <SalaryMetric />}
    </div>
    </div>
    </>
  );
}

export default SalaryToggle;

