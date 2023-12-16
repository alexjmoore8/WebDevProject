import React, { useState } from 'react';
import "../css/results.css"

function ResumeSelections({ data, handleChange }) {
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange('ResumeSelections', name, value);
    };

  
    const handleGrammarCheck = async () => {
        const textToCheck = data.resumeTitle;

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
    if (!data.resumeTitle.trim() || !data.layout || !data.style) {
        alert('Please fill out all fields before proceeding.');
        return;
    }

};
    

    return (
        <div>
            <h2>Resume Selections</h2>

            <label>Resume Title:</label>
            <input
                type="text"
                name="resumeTitle"
                value={data.resumeTitle}
                onChange={handleInputChange}
            />

            <label>Layout:</label>
            <select
                name="layout"
                value={data.layout}
                onChange={handleInputChange}
            >
                <option value="layout1">Layout 1</option>
                <option value="layout2">Layout 2</option>
                <option value="layout3">Layout 3</option>
            </select>

            <label>Style:</label>
            <select
                name="style"
                value={data.style}
                onChange={handleInputChange}
            >
                <option value="style1">Style 1</option>
                <option value="style2">Style 2</option>
                <option value="style3">Style 3</option>
            </select>   
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

export default ResumeSelections;
