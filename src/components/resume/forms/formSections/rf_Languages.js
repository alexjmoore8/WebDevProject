import React, { useState } from 'react';

function ResumeLanguages({ data, handleChange }) {
  const initialLanguages = data.languages || [{}];
  const [languages, setLanguages] = useState(initialLanguages);

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
    </div>
  );
}

export default ResumeLanguages;
