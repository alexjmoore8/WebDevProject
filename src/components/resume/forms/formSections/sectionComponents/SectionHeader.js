import React, { useState } from 'react';

function FormSectionHeader({ sectionName, data, handleChange }) {
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

  const getDefaultSectionTitle = () => {
    return includeCustomTitle ? data.sectionHeading || sectionName : sectionName;
  };

  return (
    <div>
      <h2>{sectionName}</h2>
      <label>
        <input
          type="checkbox"
          name="includeCustomTitle"
          checked={includeCustomTitle}
          onChange={(e) => setIncludeCustomTitle(e.target.checked)}
        />
        Include Custom Section Title
      </label>

      <input
        type="text"
        name="sectionHeading"
        value={getDefaultSectionTitle()}
        placeholder={`Section title to display on ${sectionName.toLowerCase()}`}
        onChange={(e) => handleChange(sectionName, e.target.name, e.target.value)}
        disabled={!includeCustomTitle}
      />
    </div>
  );
}

export default FormSectionHeader;
