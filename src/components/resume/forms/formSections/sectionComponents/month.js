import React from 'react';

const MonthDropdown = ({ value, onChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <select
      name="month"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Month</option>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
