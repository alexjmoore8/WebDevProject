import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import DegreeDropdown from './sectionComponents/degree.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeEducation({ data, handleChange }) {
  const [educations, setEducations] = useState(data.educations || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleDegreeChange = (e) => {
    setSelectedDegree(e.target.value);
  };

  const handleAddEducation = () => {
    if (educations.length < 5) {
      setEducations([...educations, { location: {} }]);
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

const handleInputChange = (index, field, value) => {
    const updatedEducations = [...educations];
    if (field.includes('location.')) {
        const locationField = field.split('.')[1];
        updatedEducations[index].location = {
            ...updatedEducations[index].location,
            [locationField]: value
        };
    } else {
        updatedEducations[index][field] = value;
    }
    setEducations(updatedEducations);
};

  const handleGrammarCheck = async () => {
    let textToCheck = educations
      .map((edu) => `${edu.institution || ''} ${edu.location?.city || ''} ${edu.major || ''}`)
      .join(' ');

    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `language=en-US&text=${encodeURIComponent(textToCheck)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setGrammarSuggestions(result.matches);
  };

  return (
    <div>
      <h2>Education</h2>

      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeEducation', e.target.name, e.target.value)}
      />

      {educations.map((education, index) => (
        <div key={index}>
          <input
            type="text"
            name={`educations[${index}].institution`}
            value={education.institution || ''}
            placeholder="School/Institution"
            onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
          />

          <input
            type="text"
            name={`educations[${index}].location.city`}
            value={education.location ? education.location.city || '' : ''}
            placeholder="City"
            onChange={(e) => handleInputChange(index, 'location.city', e.target.value)}
          />

          <StateDropdown value={selectedState} onChange={handleStateChange} />
          <DegreeDropdown value={selectedDegree} onChange={handleDegreeChange} />

          <input
            type="text"
            name={`educations[${index}].major`}
            value={education.major || ''}
            placeholder="Major"
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />

          <MonthDropdown
            value={education.startDateMonth || ''}
            onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)}
          />
          <YearDropdown
            value={education.startDateYear || ''}
            onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)}
          />

          <MonthDropdown
            value={education.endDateMonth || ''}
            onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)}
          />
          <YearDropdown
            value={education.endDateYear || ''}
            onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)}
          />

          <input
            type="text"
            name={`educations[${index}].gpa`}
            value={education.gpa || ''}
            placeholder="GPA"
            onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
          />
          <button onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}

      {educations.length < 5 && (
        <button onClick={handleAddEducation}>Add Education</button>
      )}
      <button onClick={handleGrammarCheck}>Check Grammar</button>

      {grammarSuggestions.length > 0 && (
        <div>
          <h3>Grammar Suggestions</h3>
          <ul>
            {grammarSuggestions.map((suggestion, index) => (
              <li key={index}>
                {suggestion.message} - Found: "{suggestion.context.text}"
                {suggestion.replacements.length > 0 && ` Suggestion: "${suggestion.replacements.map((rep) => rep.value).join(', ')}"`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeEducation;
