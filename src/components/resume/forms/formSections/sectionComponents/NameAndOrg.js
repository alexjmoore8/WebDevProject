import React from 'react';

function NameOrgInput({ index, data, handleChange, label }) {
  const handleInputChange = (field, value) => {
    handleChange(index, field, value);
  };

  return (
    <div>
      <label>{label} Name</label>
      <input
        type="text"
        name={`${label.toLowerCase()}Name`}
        value={data[`${label.toLowerCase()}Name`] || ''}
        placeholder={`${label} Name`}
        onChange={(e) => handleInputChange(`${label.toLowerCase()}Name`, e.target.value)}
      />
      <label>{label} Organization</label>
      <input
        type="text"
        name={`${label.toLowerCase()}Organization`}
        value={data[`${label.toLowerCase()}Organization`] || ''}
        placeholder={`${label} Organization`}
        onChange={(e) =>
          handleInputChange(`${label.toLowerCase()}Organization`, e.target.value)
        }
      />
    </div>
  );
}

export default NameOrgInput;
