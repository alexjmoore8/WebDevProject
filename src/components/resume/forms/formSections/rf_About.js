import React, { useState } from 'react';

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

            <button onClick={handleGrammarCheck}>Check Grammar</button>

      {/* generating the list for grammar and spell checking if needed */}

            {grammarSuggestions.length > 0 && (
                <div>
                    <h3>Grammar Suggestions</h3>
                    <ul>
                        {grammarSuggestions.map((suggestion, index) => (
                            <li key={index}>
                                {suggestion.message} - Found: "{suggestion.context.text}" 
                                {suggestion.replacements.length > 0 && ` Suggestion: "${suggestion.replacements.map(rep => rep.value).join(', ')}"`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ResumeAbout;
