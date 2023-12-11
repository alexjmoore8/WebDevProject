import React from 'react';

const LanguagesSection = ({ languages }) => {
  if (!languages || !languages.languages || !Array.isArray(languages.languages)) {
    return <div>No language data available.</div>;
  }

  return (
    <div>
      <div><h2>{languages.sectionHeading}</h2></div>
      {languages.languages.map((language, index) => (
        <div key={index}>
          <div>{language.language}</div>
          <div>{`Level: ${language.level}`}</div>
        </div>
      ))}
    </div>
  );
}

export default LanguagesSection;
