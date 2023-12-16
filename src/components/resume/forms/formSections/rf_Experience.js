import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';
import "../css/results.css"

function ResumeExperience({ data, handleChange }) {
  const [experience, setExperience] = useState(data.experience || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);
  const [isStartDateEnabled, setIsStartDateEnabled] = useState(false);
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false);

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
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setExperience(updatedExperience);
  };

  const handleToggleStartDate = (index) => {
    const updatedExperience = [...experience];
    updatedExperience[index].startDateEnabled = !updatedExperience[index].startDateEnabled;
    setExperience(updatedExperience);
  };

  const handleToggleEndDate = (index) => {
    const updatedExperience = [...experience];
    updatedExperience[index].endDateEnabled = !updatedExperience[index].endDateEnabled;
    setExperience(updatedExperience);
  };

  const handleGrammarCheck = async () => {
    let textToCheck = experience
      .map((exp) => `${exp.position || ''} ${exp.organization || ''} ${exp.city || ''} ${exp.bullets || ''}`)
      .join('. ');

    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `language=en-US&text=${encodeURIComponent(textToCheck)}`,
    });

    if (response.ok) {
      const result = await response.json();
      setGrammarSuggestions(result.matches);
    }
  };

    const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Experience' : 'Experience';
    };

  return (
    <div>
      <h2>Experience</h2>
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
          onChange={(e) => handleChange('ResumeExperience', e.target.name, e.target.value)}
          disabled={!includeCustomTitle}
        />

      {experience.map((exp, index) => (
        <div key={index}>
          <input type="text" value={exp.position} placeholder="Position" onChange={(e) => handleInputChange(index, 'position', e.target.value)} />
          <input type="text" value={exp.organization} placeholder="Organization" onChange={(e) => handleInputChange(index, 'organization', e.target.value)} />
          <input type="text" value={exp.city} placeholder="City" onChange={(e) => handleInputChange(index, 'city', e.target.value)} />
          
          {/* Start Date */}
          <label>
            <input
              type="checkbox"
              checked={exp.startDateEnabled || false}
              onChange={() => handleToggleStartDate(index)}
            />
            Start Date
          </label>
          {exp.startDateEnabled && (
            <>
              <MonthDropdown value={exp.startDateMonth} onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)} />
              <YearDropdown value={exp.startDateYear} onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)} />
            </>
          )}

          {/* End Date */}
          <label>
            <input
              type="checkbox"
              checked={exp.endDateEnabled || false}
              onChange={() => handleToggleEndDate(index)}
            />
            End Date
          </label>
          {exp.endDateEnabled && (
            <>
              <MonthDropdown value={exp.endDateMonth} onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)} />
              <YearDropdown value={exp.endDateYear} onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)} />
            </>
          )}

          <textarea value={exp.bullets} placeholder="Job Bullets (one per line)" onChange={(e) => handleInputChange(index, 'bullets', e.target.value)} />
          <input type="text" value={exp.tags} placeholder="Tags (comma-separated)" onChange={(e) => handleInputChange(index, 'tags', e.target.value)} />
          {experience.length > 1 && (
            <button onClick={() => handleRemoveExperience(index)}>Remove</button>
          )}
        </div>
      ))}

      {experience.length < 20 && (
        <button onClick={handleAddExperience}>Add Experience</button>
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
                    <span className="suggestion-replacement" dangerouslySetInnerHTML={{ __html: `"${suggestion.replacements.map(rep => rep.value).join(', ')}"` }}>
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

export default ResumeExperience;
