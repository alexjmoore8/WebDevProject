import React, { useState } from 'react';
import FormSectionHeader from './sectionComponents/SectionHeader.js'; 
import ItemAndLevel from './sectionComponents/ItemAndLevel.js';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import "../css/results.css"

function ResumeLanguages({ data, handleChange }) {
  const initialLanguages = data.languages || [{}];
  const [languages, setLanguages] = useState(initialLanguages);
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

  const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Languages' : 'Languages';
  };

  const languageLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native', 'Other'];

  return (
    <div>
      <FormSectionHeader sectionName="Languages" data={data} handleChange={handleChange} />

      {languages.map((language, index) => (
        <div key={index}>
          <ItemAndLevel
            key={index}
            item={language}
            handleInputChange={handleInputChange}
            handleRemoveItem={handleRemoveLanguage}
            levels={languageLevels}
            nameLabel="Language"
            levelLabel="Proficiency"
            index={index}
        />

          <button onClick={() => handleRemoveLanguage(index)}>Remove</button>
        </div>
      ))}

      {languages.length < 10 && (
        <button onClick={handleAddLanguage}>Add Language</button>
      )}
    <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumeLanguages;
