import React from 'react';

const LanguagesSection = ({ languages }) => {
  if (!languages || !languages.languages || !Array.isArray(languages.languages)) {
    return <div className="languages-section">No language data available.</div>;
  }

  // TODO add tag comparison
  const limitedLanguages = languages.languages.slice(0, 4);

  return (
    <div className="languages-section">
      <div className="languages-heading"><h2>{languages.sectionHeading}</h2></div>
      {limitedLanguages.map((language, index) => (
        <div key={index} className="language-item">
          <div className="language-name"><h3>{language.language}</h3></div>
          <div className="language-level"><h6>{`Level: ${language.level}`}</h6></div>
        </div>
      ))}
    </div>
  );
}

export default LanguagesSection;
