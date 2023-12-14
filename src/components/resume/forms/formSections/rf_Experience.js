import React, { useState, useEffect, useMemo } from 'react';
import StateDropdown from './sectionComponents/state.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeExperience({ data, handleChange }) {
  const initialExperience = useMemo(() => {
    return data.experience ? [...data.experience] : [{}];
  }, [data.experience]);

  const [experience, setExperience] = useState(initialExperience);
  const [selectedState, setSelectedState] = useState('');
  const [errors, setErrors] = useState(Array(initialExperience.length).fill({}));

  useEffect(() => {
    if (initialExperience.length > 0) {
      setSelectedState(initialExperience[0]?.location?.selectedState || '');
    }
  }, [initialExperience]);


  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleAddExperience = () => {
    if (experience.length < 10) {
      setExperience([
        ...experience,
        { location: { selectedState: '' } },
      ]);
      setErrors([...errors, {}]);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleInputChange = async (index, field, value) => {
    const updatedExperience = [...experience];
    if (!updatedExperience[index].location) {
      updatedExperience[index].location = {};
    }
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);

    const validationErrors = await validateField(index, field, value);
    const updatedErrors = [...errors];
    updatedErrors[index] = validationErrors;
    setErrors(updatedErrors);
  };

  const validateField = async (index, field, value) => {
    if (field === 'position' || field === 'organization') {
      try {
        const grammarErrors = await checkGrammar(value);
        if (grammarErrors.length > 0) {
          return 'Contains grammar errors';
        }
      } catch (error) {
        console.error(error);
        return 'Error checking grammar';
      }
    }
    return '';
  };

  const checkGrammar = async (text) => {
    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        body: JSON.stringify({
          text: text,
          language: 'en-US',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`LanguageTool API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.matches;
    } catch (error) {
      console.error(error);
      return [];
    }
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

      {experience.map((experienceData, index) => (
        <div key={index}>
          <label>Job Title</label>
          <input
            type="text"
            name={`experience[${index}].position`}
            value={experienceData.position || ''}
            placeholder="Job position"
            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
          />
          {errors[index] && errors[index].position && (
            <span className="error">{errors[index].position}</span>
          )}

          <label>Company</label>
          <input
            type="text"
            name={`experience[${index}].organization`}
            value={experienceData.organization || ''}
            placeholder="Company"
            onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
          />
          {errors[index] && errors[index].organization && (
            <span className="error">{errors[index].organization}</span>
          )}

          <label>City</label>
          <input
            type="text"
            name={`experience[${index}].location.city`}
            value={experienceData.location ? experienceData.location.city || '' : ''}
            placeholder="City"
            onChange={(e) => handleInputChange(index, 'location.city', e.target.value)}
          />

          <label>State</label>
          <div>
            <StateDropdown
              value={selectedState}
              onChange={handleStateChange}
            />
          </div>

          <div>
            <MonthDropdown
              value={experienceData.startDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)}
            />
            <YearDropdown
              value={experienceData.startDateYear || ''}
              onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)}
            />
          </div>

          <label>End Date</label>
          <div>
            <MonthDropdown
              value={experienceData.endDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)}
            />
            <YearDropdown
              value={experienceData.endDateYear || ''}
              onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)}
            />
          </div>

          <label>Bullets</label>
          <textarea
            name={`experience[${index}].bullets`}
            value={experienceData.bullets ? experienceData.bullets.join('\n') : ''}
            placeholder="Job Bullets (one per line)"
            onChange={(e) => handleInputChange(index, 'bullets', e.target.value.split('\n'))}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`experience[${index}].tags`}
            value={experienceData.tags ? experienceData.tags.join(', ') : ''}
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
