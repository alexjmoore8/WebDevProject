import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import "../css/list.css"

function ResumeLanguages({ data, handleChange }) {
  const initialLanguages = data.languages || [{}];
  const [languages, setLanguages] = useState(initialLanguages);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

  const handleAddLanguage = () => {
    if (languages.length < 10) {
      setLanguages([...languages, {}]);
    }
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleInputChange = (index, field, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const handleGrammarCheck = async () => {
    try {
      let textToCheck = languages.map(lang => `${lang.language || ''} ${lang.otherLevel || ''} ${data.sectionHeading || ''} `).join('. ');

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
    } catch (error) {
      console.error('Error fetching grammar check data:', error);
    }
  };

  const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Languages' : 'Languages';
  };

  const languageLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native', 'Other'];

  return (
    <div>
      <h2>Languages</h2>
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
        onChange={(e) => handleChange('ResumeLanguages', e.target.name, e.target.value)}
        disabled={!includeCustomTitle}
      />

      {languages.map((language, index) => (
        <div key={index}>
          <label>Language</label>
          <input
            type="text"
            name={`languages[${index}].language`}
            value={language.language || ''}
            placeholder="Language"
            onChange={(e) => handleInputChange(index, 'language', e.target.value)}
          />

          <label>Level</label>
          <select
            name={`languages[${index}].level`}
            value={language.level || ''}
            onChange={(e) => handleInputChange(index, 'level', e.target.value)} // Change this line
          >
          
            {languageLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          {language.level === 'Other' && (
            <input
              type="text"
              placeholder="Other Level"
              value={language.otherLevel || ''}
              onChange={(e) => handleInputChange(index, 'otherLevel', e.target.value)}
            />
          )}

          <button className='list-button' onClick={() => handleRemoveLanguage(index)}>Remove</button>
        </div>
      ))}

      {languages.length < 10 && (
        <button className='list-button' onClick={handleAddLanguage}>Add</button>
      )}
      <GrammarCheck data={data} handleChange={handleChange} />

    </div>
  );
}

export default ResumeLanguages;