import React, { useState } from 'react';
import "../css/results.css"


function ResumeAbout({ data, handleChange }) {
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

      // API call for grammar checking

    const handleGrammarCheck = async () => {
        const response = await fetch('https://api.languagetool.org/v2/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `language=en-US&text=${encodeURIComponent(data.sectionHeading + ' ' + data.summary)}`,
        });

        const result = await response.json();
        setGrammarSuggestions(result.matches);
    };
   
  const getDefaultSectionTitle = () => {
        return includeCustomTitle ? data.sectionHeading || 'About Me' : 'About Me';
    };

    return (
        <div>
            <h2>About</h2>
            
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
                onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
                disabled={!includeCustomTitle}
            />

            <label>Summary</label>
            <textarea
                name="summary"
                value={data.summary}
                placeholder="Write a brief summary about yourself"
                onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
            />
            <button onClick={handleGrammarCheck}>Check Grammar</button>

      {/* generating the list for grammar and spell checking if needed */}

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

export default ResumeAbout;
