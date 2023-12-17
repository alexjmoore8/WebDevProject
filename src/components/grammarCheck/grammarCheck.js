import React, { useState } from 'react';
import "./css/grammar.css"

const GrammarCheck = ({ data, handleChange }) => {
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
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
        
        setShowSuggestions(!showSuggestions);
    };
    
    return (
        <div>
            <button className="grammar-button" onClick={handleGrammarCheck}>Check Grammar</button>
            
            {showSuggestions && grammarSuggestions.length > 0 && (
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

export default GrammarCheck;
