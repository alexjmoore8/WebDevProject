import React from 'react';

const PlatformDropdown = ({ value, handleChange }) => {
  const PlatformOptions = [
    'LinkedIn',
    'GitHub',
    'Twitter',
    'Facebook',
    'Instagram',
    'YouTube',
    'Personal Website',
    'Other',
  ];

  return (
  <select
    name="socialMedia"
    value={value}
    onChange={handleChange}
  >
      <option value="">Select Social Media Platform</option>
      {PlatformOptions.map((platform, index) => (
        <option key={index} value={platform}>
          {platform}
        </option>
      ))}
    </select>
  );
};

export default PlatformDropdown;
