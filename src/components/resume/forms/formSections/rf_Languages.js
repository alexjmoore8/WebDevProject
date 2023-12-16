import React, { useState } from 'react';
import "../css/results.css"

function ResumeLanguages({ data, handleChange }) {
  const initialLanguages = data.languages || [{}];
  const [languages, setLanguages] = useState(initialLanguages);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);

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

   const handleNextClick = () => {
    // Checking if all required fields are filled out
    if (!data.sectionHeading || !data.language.language  ) {
        alert('Please fill out all fields before proceeding.');
        return;
    }
};



  const languageLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native', 'Other'];

  return (
    <div>
      <h2>Languages</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeLanguages', e.target.name, e.target.value)}
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
            onChange={(e) => handleInputChange(index, 'level', e.target.value)}
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

          <button onClick={() => handleRemoveLanguage(index)}>Remove</button>
        </div>
      ))}

      {languages.length < 10 && (
        <button onClick={handleAddLanguage}>Add Language</button>
      )}

    <button onClick={handleNextClick}>Next</button>

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

export default ResumeLanguages;
