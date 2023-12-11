import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';

function ResumeExperience({ data, handleChange }) {
  const initialExperience = data.experience || [{}]; // Ensure it's initialized as an array
  const [experience, setExperience] = useState(initialExperience);

  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };


  const handleAddExperience = () => {
    if (experience.length < 10) {
      setExperience([...experience, {}]);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  return (
    <div>
      <h2>Experience</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeExperience', e.target.name, e.target.value)}
      />

      {experience.map((data, index) => (
        <div key={index}>
          <label>Job Title</label>
          <input
            type="text"
            name={`experience[${index}].position`}
            value={data.position || ''}
            placeholder="Job position"
            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
          />

          <label>Company</label>
          <input
            type="text"
            name={`experience[${index}].organization`}
            value={data.organization || ''}
            placeholder="Company"
            onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
          />

          <label>City</label>
          <input
              type="text"
              name="location.city"
              value={data.location.city}
              placeholder="City"
              onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
          />

          <label>State</label>
          <div>
              <StateDropdown value={selectedState} handleChange={handleStateChange} />
          </div>

          <label>End Date</label>
          <input
            type="text"
            name={`experience[${index}].endDate`}
            value={data.endDate || ''}
            placeholder="End Date"
            onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
          />

          <label>Bullets</label>
          <textarea
            name={`experience[${index}].bullets`}
            value={data.bullets ? data.bullets.join('\n') : ''}
            placeholder="Job Bullets (one per line)"
            onChange={(e) => handleInputChange(index, 'bullets', e.target.value.split('\n'))}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`experience[${index}].tags`}
            value={data.tags ? data.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => handleInputChange(index, 'tags', e.target.value.split(', '))}
          />

          {experience.length > 1 && (
            <button onClick={() => handleRemoveExperience(index)}>Remove</button>
          )}
        </div>
      ))}

      {experience.length < 10 && (
        <button onClick={handleAddExperience}>Add Experience</button>
      )}
    </div>
  );
}

export default ResumeExperience;
