import React, { useState } from 'react';
import "../css/results.css"


function ResumeAbout({ data, handleChange }) {
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);

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

    const handleNextClick = () => {
    // Checking if all required fields are filled out
    if (!data.sectionHeading || !data.summar) {
        alert('Please fill out all fields before proceeding.');
        return;
    }
};

   
    return (
        <div>
            <h2>About</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
            />

            <label>Summary</label>
            <textarea
                name="summary"
                value={data.summary}
                placeholder="Write a brief summary about yourself"
                onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
            />
            <button onClick={handleNextClick}>Next</button>
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
