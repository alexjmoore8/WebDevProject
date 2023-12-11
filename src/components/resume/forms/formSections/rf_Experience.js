import React, { useState } from 'react';

function ResumeExperience({ data, handleChange }) {
  const initialExperience = data.experience || [{}]; // Ensure it's initialized as an array
  const [experience, setExperience] = useState(initialExperience);

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

      {experience.map((exp, index) => (
        <div key={index}>
          <label>Job Title</label>
          <input
            type="text"
            name={`experience[${index}].position`}
            value={exp.position || ''}
            placeholder="Job position"
            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
          />

          <label>Company</label>
          <input
            type="text"
            name={`experience[${index}].organization`}
            value={exp.organization || ''}
            placeholder="Company"
            onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
          />

          <label>Location</label>
          <input
            type="text"
            name={`experience[${index}].location`}
            value={exp.location || ''}
            placeholder="Location"
            onChange={(e) => handleInputChange(index, 'location', e.target.value)}
          />

          <label>Start Date</label>
          <input
            type="text"
            name={`experience[${index}].startDate`}
            value={exp.startDate || ''}
            placeholder="Start Date"
            onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
          />

          <label>End Date</label>
          <input
            type="text"
            name={`experience[${index}].endDate`}
            value={exp.endDate || ''}
            placeholder="End Date"
            onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
          />

          <label>Bullets</label>
          <textarea
            name={`experience[${index}].bullets`}
            value={exp.bullets ? exp.bullets.join('\n') : ''}
            placeholder="Job Bullets (one per line)"
            onChange={(e) => handleInputChange(index, 'bullets', e.target.value.split('\n'))}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`experience[${index}].tags`}
            value={exp.tags ? exp.tags.join(', ') : ''}
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
