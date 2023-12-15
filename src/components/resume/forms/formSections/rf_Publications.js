import React, { useState } from 'react';
import "../css/results.css"

function ResumePublications({ data, handleChange }) {
  const [publications, setPublications] = useState(data.publications || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);

  const handleAddPublication = () => {
    if (publications.length < 15) {
      setPublications([...publications, {}]);
    }
  };

  const handleRemovePublication = (index) => {
    const updatedPublications = [...publications];
    updatedPublications.splice(index, 1);
    setPublications(updatedPublications);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPublications = [...publications];
    updatedPublications[index][field] = value;
    setPublications(updatedPublications);
  };

  const handleGrammarCheck = async () => {
    try {
      let textToCheck = publications
        .map((publication) =>
          `${data.sectionHeading || ''} ${publication.title  || ''} ${publication.publisher || ''} ${publication.link || ''} ${
            publication.tags ? publication.tags.join(', ') : ''
          }`
        )
        .join('. ');

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
    if (!data.sectionHeading || !data.publication.title || !data.publication.publisher || !data.publication.date || !data.publication.link) {
        alert('Please fill out all fields before proceeding.');
        return;
    }

};

  return (
    <div>
      <h2>Publications</h2>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumePublications', e.target.name, e.target.value)}
      />

      {publications.map((publication, index) => (
        <div key={index}>
          <input
            type="text"
            name={`publications[${index}].title`}
            value={publication.title || ''}
            placeholder="Publication Title"
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].publisher`}
            value={publication.publisher || ''}
            placeholder="Publisher"
            onChange={(e) => handleInputChange(index, 'publisher', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].date`}
            value={publication.date || ''}
            placeholder="Date"
            onChange={(e) => handleInputChange(index, 'date', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].link`}
            value={publication.link || ''}
            placeholder="Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].tags`}
            value={publication.tags ? publication.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => {
              const tagsArray = e.target.value.split(', ').filter((tag) => tag.trim() !== '');
              handleInputChange(index, 'tags', tagsArray);
            }}
          />

          <button onClick={() => handleRemovePublication(index)}>Remove</button>
        </div>
      ))}

      {publications.length < 15 && (
        <button onClick={handleAddPublication}>Add Publication</button>
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

export default ResumePublications;
