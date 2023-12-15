import React, { useState } from 'react';

function ResumePublications({ data, handleChange }) {
  const [publications, setPublications] = useState(data.publications || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);

  const handleAddPublication = () => {
    if (publications.length < 15) {
      setPublications([...publications, {}]);
    }
  };

  const handleGrammarCheck = async () => {
    try {
      let textToCheck = publications
        .map((pub) =>
          `${pub.title || ''} ${pub.publisher || ''} ${pub.date || ''} ${pub.link || ''} ${
            pub.tags ? pub.tags.join(', ') : ''
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

  return (
    <div>
      <h2>Publications</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumePublications', e.target.name, e.target.value)}
      />

      {publications.map((publication, index) => (
        <div key={index}>
          {/* ... Rest of your form input fields ... */}
        </div>
      ))}

      {publications.length < 15 && (
        <button onClick={handleAddPublication}>Add Publication</button>
      )}

      <button onClick={handleGrammarCheck}>Check Grammar</button>

      {grammarSuggestions.length > 0 && (
        <div>
          <h3>Grammar Suggestions</h3>
          <ul>
            {grammarSuggestions.map((suggestion, index) => (
              <li key={index}>
                {suggestion.message} - Found: "{suggestion.context.text}"
                {suggestion.replacements.length > 0 &&
                  ` Suggestion: "${suggestion.replacements.map((rep) => rep.value).join(', ')}"`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumePublications;
