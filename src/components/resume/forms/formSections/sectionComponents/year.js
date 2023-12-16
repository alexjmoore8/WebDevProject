import React from 'react';

const YearDropdown = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const endYear = currentYear + 10;

  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  return (
    <select
      name="year"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Year</option>
      {years.map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearDropdown;
