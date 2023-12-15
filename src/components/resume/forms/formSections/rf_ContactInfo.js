import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import PronounsDropdown from './sectionComponents/pronouns.js';

function ResumeContactInfo({ data, handleChange, handleNextClick }) {
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [errors, setErrors] = useState({});

    const validateField = (name, value) => {
        if (!value) {
            return 'This field is required';
        }
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            return 'Invalid email address';
        }
        if ((name === 'firstName' || name === 'lastName' || name === 'location.city') && /\d/.test(value)) {
            return 'This field cannot contain numbers';
        }
        return '';
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        handleInputChange('location.state', e.target.value);
    };

    const handleInputChange = (name, value) => {
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
        handleChange('ResumeContactInfo', name, value);
    };

    const handleGrammarCheck = async () => {
        const textFields = ['firstName', 'lastName', 'email', 'location.city', 'phone'];
        const textToCheck = textFields.map(field => data[field]).join(' ');

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

    return (
        <div>
            <h2>Contact Info</h2>

            <label>First Name</label>
            <input
                type="text"
                name="firstName"
                value={data.firstName}
                placeholder="First Name"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <label>Last Name</label>
            <input
                type="text"
                name="lastName"
                value={data.lastName}
                placeholder="Last Name"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <label>Email Address</label>
            <input
                type="text"
                name="email"
                value={data.email}
                placeholder="Email Address"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <label>City</label>
            <input
                type="text"
                name="location.city"
                value={data.location.city}
                placeholder="City"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <label>State</label>
            <StateDropdown value={selectedState} handleChange={handleStateChange} />

            <label>Phone</label>
            <input
                type="text"
                name="phone"
                value={data.phone}
                placeholder="Phone"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />

            <PronounsDropdown
                value={data.pronouns}
                onChange={(value) => handleInputChange('pronouns', value)}
                customPronouns={data.customPronouns}
                onCustomPronounsChange={(value) => handleInputChange('customPronouns', value)}
            />

            <button onClick={handleGrammarCheck}>Check Grammar</button>

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

export default ResumeContactInfo;
