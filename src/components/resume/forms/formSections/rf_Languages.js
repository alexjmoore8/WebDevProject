import React, { useState } from 'react';
import Typo from 'typo-js';

function ResumeLanguages({ data, handleChange }) {
  const initialLanguages = data.languages || [{}];
  const [languages, setLanguages] = useState(initialLanguages);
  const dictionary = new Typo('en_US');

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

  const languageLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native', 'Other'];

  const isLanguageValid = (language) => language.trim() !== '';
  const isLevelValid = (level) => languageLevels.includes(level) || level === 'Other';
  const isOtherLevelValid = (level, otherLevel) => level !== 'Other' || (level === 'Other' && otherLevel.trim() !== '');

  const isFormValid = (language, level, otherLevel) => {
    return isLanguageValid(language) && isLevelValid(level) && isOtherLevelValid(level, otherLevel);
  };

  const isSpellingValid = (text) => {
    return dictionary.check(text);
  };

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

          {!isFormValid(language.language, language.level, language.otherLevel) && (
            <div className="error-message">Invalid input. Please check your data.</div>
          )}

          {!isSpellingValid(language.language) && (
            <div className="error-message">Spelling error in the language name.</div>
          )}

          <button onClick={() => handleRemoveLanguage(index)}>Remove</button>
        </div>
      ))}

      {languages.length < 10 && (
        <button onClick={handleAddLanguage}>Add Language</button>
      )}
    </div>
  );
}

export default ResumeLanguages;
