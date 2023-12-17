import React from 'react';

const TagsInput = ({ value, onChange, label }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const tagsArray = inputValue.split(',').map((tag) => tag.trim());
    onChange(tagsArray);
  };

  return (
    <div>
      <label>Tags</label>
      <input
        type="text"
        value={value.join(', ')}
        placeholder={`Enter ${label.toLowerCase()} tags (comma-separated)`}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TagsInput;
