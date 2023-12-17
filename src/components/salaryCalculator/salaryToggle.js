import React, { useState } from 'react';
import SalaryCalculator from './salaryCalculator.js';
import SalaryMetric from './salaryMetric.js';

function SalaryToggle() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="toggle-group">
      <button className="toggle-button" onClick={() => setToggle(!toggle)}>
        {toggle ? 'Salary Tax Calculator' : 'Fair Salary Metric'}
        </button>
      {toggle ? <SalaryCalculator /> : <SalaryMetric />}
    </div>
  );
}

export default SalaryToggle;

