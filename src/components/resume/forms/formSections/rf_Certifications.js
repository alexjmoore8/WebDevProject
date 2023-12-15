import React, { useState } from 'react';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';
import "../css/results.css"


function ResumeCertifications({ data, handleChange, handleNext }) {
  const initialCertifications = Array.isArray(data.certifications)
    ? data.certifications.map(cert => ({
        ...cert,
        dateMonth: cert.dateMonth || '',
        dateYear: cert.dateYear || '',
      }))
    : [{}];

  const [certifications, setCertifications] = useState(initialCertifications);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [errors, setErrors] = useState({});

  const validateField = (index, field, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return 'This field is required';
    }
    return '';
  };

  const handleInputChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);

    const error = validateField(index, field, value);
    setErrors({ ...errors, [`${index}-${field}`]: error });
  };

  const handleAddCertification = () => {
    if (certifications.length < 10) {
      setCertifications([...certifications, { dateMonth: '', dateYear: '' }]);
    }
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const handleGrammarCheck = async () => {
    let textToCheck = certifications.map(cert => `${cert.name || ''} ${cert.organization || ''} ${cert.tags?.join(', ') || ''}`).join('. ');
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `language=en-US&text=${encodeURIComponent(textToCheck)}`,
    });

    const result = await response.json();
    setGrammarSuggestions(result.matches);
  };

     const handleNextClick = () => {
    // Checking if all required fields are filled out
    if (!data.sectionHeading || !data.certification.name || !data.certification.organization || !data.certification.tags ) {
        alert('Please fill out all fields before proceeding.');
        return;
    }

};

  return (
    <div>
      <h2>Certifications</h2>

      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeCertifications', e.target.name, e.target.value)}
      />

      {certifications.map((certification, index) => (
        <div key={index}>
          <label>Certification Name</label>
          <input
            type="text"
            name={`certifications[${index}].name`}
            value={certification.name || ''}
            placeholder="Certification Name"
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          {errors[`${index}-name`] && <p className="error">{errors[`${index}-name`]}</p>}

          <label>Organization</label>
          <input
            type="text"
            name={`certifications[${index}].organization`}
            value={certification.organization || ''}
            placeholder="Organization"
            onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
          />
          {errors[`${index}-organization`] && <p className="error">{errors[`${index}-organization`]}</p>}

          <label>Date</label>
          <div>
            <MonthDropdown 
              value={certification.dateMonth} 
              onChange={(e) => handleInputChange(index, 'dateMonth', e.target.value)} 
            />
            <YearDropdown 
              value={certification.dateYear} 
              onChange={(e) => handleInputChange(index, 'dateYear', e.target.value)} 
              startYear={2000} 
              endYear={2030} 
            />
          </div>

          <label>Tags</label>
          <input
            type="text"
            name={`certifications[${index}].tags`}
            value={certification.tags ? certification.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => {
              const tagsArray = e.target.value.split(', ').filter((tag) => tag.trim() !== '');
              handleInputChange(index, 'tags', tagsArray);
            }}
          />
          {errors[`${index}-tags`] && <p className="error">{errors[`${index}-tags`]}</p>}

          <button onClick={() => handleRemoveCertification(index)}>Remove</button>
        </div>
      ))}

      {certifications.length < 10 && (
        <button onClick={handleAddCertification}>Add Certification</button>
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

export default ResumeCertifications;
