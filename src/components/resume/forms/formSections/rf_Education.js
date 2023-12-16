import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import DegreeDropdown from './sectionComponents/degree.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';
import "../css/form.css"

function ResumeEducation({ data, handleChange }) {
  const [educations, setEducations] = useState(data.educations || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [selectedState, setselectedState] = useState(Array(educations.length).fill(''));
  const [selectedDegrees, setSelectedDegrees] = useState(Array(educations.length).fill(''));
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);


  const handleStateChange = (e, index) => {
    const newselectedState = [...selectedState];
    newselectedState[index] = e.target.value;
    setselectedState(newselectedState);
  };

  const handleDegreeChange = (e, index) => {
    const newSelectedDegrees = [...selectedDegrees];
    newSelectedDegrees[index] = e.target.value;
    setSelectedDegrees(newSelectedDegrees);
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

  const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Education' : 'Education';
  };

  return (
    <div>
      <h2>Education</h2>

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
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeEducation', e.target.name, e.target.value)}
        disabled={!includeCustomTitle}
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

          <StateDropdown value={selectedState[index]} onChange={(e) => handleStateChange(e, index)} />
          <DegreeDropdown value={selectedDegrees[index]} onChange={(e) => handleDegreeChange(e, index)} />

          <input
            type="text"
            name={`educations[${index}].major`}
            value={education.major || ''}
            placeholder="Major"
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />

        <label>
          <input
            type="checkbox"
            name={`educations[${index}].includeStartDate`}
            checked={education.includeStartDate || false}
            onChange={(e) => handleInputChange(index, 'includeStartDate', e.target.checked)}
          />
          Include Start Date
        </label>

        {education.includeStartDate && (
          <>
            <MonthDropdown
              value={education.startDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)}
            />
            <YearDropdown
              value={education.startDateYear || ''}
              onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)}
            />
          </>
        )}

        <label>
          <input
            type="checkbox"
            name={`educations[${index}].includeEndDate`}
            checked={education.includeEndDate || false}
            onChange={(e) => handleInputChange(index, 'includeEndDate', e.target.checked)}
          />
          Include End Date
        </label>

        {education.includeEndDate && (
          <>
            <MonthDropdown
              value={education.endDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)}
            />
            <YearDropdown
              value={education.endDateYear || ''}
              onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)}
            />
          </>
        )}

        <label>
          <input
            type="checkbox"
            name={`educations[${index}].includeGPA`}
            checked={education.includeGPA || false}
            onChange={(e) => handleInputChange(index, 'includeGPA', e.target.checked)}
          />
          Include GPA
        </label>

        {education.includeGPA && (
          <input
            type="text"
            name={`educations[${index}].gpa`}
            value={education.gpa || ''}
            placeholder="GPA"
            onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
          />
        )}
          <button onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}

      {educations.length < 5 && (
        <button onClick={handleAddEducation}>Add Education</button>
      )}

      <button onClick={handleGrammarCheck}>Check Grammar</button>

    {grammarSuggestions.length > 0 && (
    <div className="grammar-suggestions-container">
        <h3>Grammar Suggestions</h3>
        <ul className="grammar-suggestions-list">
            {grammarSuggestions.map((suggestion, index) => (
                <li key={index}>
                    <span>{suggestion.message}</span> - Found: <span className="suggestion-context">"{suggestion.context.text}"</span>
                    {suggestion.replacements.length > 0 && (
                        <div>
                            Suggestion: 
                            <span className="suggestion-replacement"
                                  dangerouslySetInnerHTML={{ __html: `"${suggestion.replacements.map(rep => rep.value).join(', ')}"` }}>
                            </span>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
)}
    </div>
);
}

export default ResumeEducation;
