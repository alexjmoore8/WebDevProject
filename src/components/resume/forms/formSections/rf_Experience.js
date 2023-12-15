import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeExperience({ data, handleChange }) {
  const [experience, setExperience] = useState(data.experience || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);

  const handleAddExperience = () => {
    if (experience.length < 10) {
      setExperience([...experience, { location: { state: '' }, position: '', organization: '', city: '', startDateMonth: '', startDateYear: '', endDateMonth: '', endDateYear: '', bullets: '', tags: '' }]);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {...updatedExperience[index], [field]: value};
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

  return (
    <div>
      <h2>Experience</h2>
      {experience.map((exp, index) => (
        <div key={index}>
          <input type="text" value={exp.position} placeholder="Position" onChange={(e) => handleInputChange(index, 'position', e.target.value)} />
          <input type="text" value={exp.organization} placeholder="Organization" onChange={(e) => handleInputChange(index, 'organization', e.target.value)} />
          <input type="text" value={exp.city} placeholder="City" onChange={(e) => handleInputChange(index, 'city', e.target.value)} />
          <MonthDropdown value={exp.startDateMonth} onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)} />
          <YearDropdown value={exp.startDateYear} onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)} />
          <MonthDropdown value={exp.endDateMonth} onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)} />
          <YearDropdown value={exp.endDateYear} onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)} />
          <textarea value={exp.bullets} placeholder="Job Bullets (one per line)" onChange={(e) => handleInputChange(index, 'bullets', e.target.value)} />
          <input type="text" value={exp.tags} placeholder="Tags (comma-separated)" onChange={(e) => handleInputChange(index, 'tags', e.target.value)} />
          {experience.length > 1 && (
            <button onClick={() => handleRemoveExperience(index)}>Remove</button>
          )}
        </div>
      ))}
      {experience.length < 10 && (
        <button onClick={handleAddExperience}>Add Experience</button>
      )}
      <button onClick={handleGrammarCheck}>Check Grammar</button>
      {grammarSuggestions.length > 0 && (
        <div>
          <h3>Grammar Suggestions</h3>
          <ul>
            {grammarSuggestions.map((suggestion, idx) => (
              <li key={idx}>{`${suggestion.message} - Found in: "${suggestion.context.text}"`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeExperience;
