import React from 'react';

const DegreeDropdown = ({ value, onChange }) => {
  const degrees = [
    'High School Diploma', 'GED', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate Degree'
  ];

  return (
    <select
      name="degree"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Degree</option>
      {degrees.map((degree, index) => (
        <option key={index} value={degree}>
          {degree}
        </option>
      ))}
    </select>
  );
};

export default DegreeDropdown;