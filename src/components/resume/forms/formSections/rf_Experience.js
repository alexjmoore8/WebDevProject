import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeExperience({ data, handleChange }) {
  const initialExperience = data.experience || [{}]; // Ensure it's initialized as an array
  const [experience, setExperience] = useState(initialExperience);

  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleAddExperience = () => {
    if (experience.length < 20) {
      setExperience([
        ...experience,
        { location: { selectedState: '' } }
      ]);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleInputChange = (index, field, value) => {
  const updatedExperience = [...experience];
    if (!updatedExperience[index].location) {
      updatedExperience[index].location = {}; 
    }
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
            name={`experiences[${index}].location.city`} // Use the correct name
            value={data.location ? data.location.city || '' : ''}
            placeholder="City"
            onChange={(e) => handleInputChange(index, 'location.city', e.target.value)} // Update the field path
          />

          <label>State</label>
          <div>
              <StateDropdown value={selectedState} onChange={handleStateChange} />
          </div>

          <div>
            <MonthDropdown
              value={data.startDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)}
            />
            <YearDropdown
              value={data.startDateYear || ''}
              onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)}
            />
          </div>

          <label>End Date</label>
          <div>
            <MonthDropdown
              value={data.endDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)}
            />
            <YearDropdown
              value={data.endDateYear || ''}
              onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)}
            />
          </div>

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

      {experience.length < 20 && (
        <button onClick={handleAddExperience}>Add Experience</button>
      )}
    </div>
  );
}

export default ResumeExperience;
