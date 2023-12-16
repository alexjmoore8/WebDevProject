import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import PronounsDropdown from './sectionComponents/pronouns.js';
import "../css/results.css"

function ResumeContactInfo({ data, handleChange, handleNextClick }) {
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [errors, setErrors] = useState({});

    const formatPhoneNumber = (input) => {
        const numericInput = input.replace(/\D/g, '');

        let formattedPhoneNumber = '';
        for (let i = 0; i < numericInput.length; i++) {
        if (i === 0) {
            formattedPhoneNumber += `(${numericInput[i]}`;
        } else if (i === 3) {
            formattedPhoneNumber += `) - ${numericInput[i]}`;
        } else if (i === 6) {
            formattedPhoneNumber += ` - ${numericInput[i]}`;
        } else {
            formattedPhoneNumber += numericInput[i];
        }
        }
        return formattedPhoneNumber;
    };

    const validateField = (name, value) => {
        if (!value && name !== 'pronouns') {
            return 'This field is required';
        }
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            return 'Invalid email address';
        }
        if ((name === 'firstName' || name === 'lastName' || name === 'location.city') && /\d/.test(value)) {
            return 'This field cannot contain numbers';
        }
        if (name === 'phone' && !/^\(\d{3}\) - \d{3} - \d{4}$/.test(value)) {
            return 'Invalid phone number';
        }
        return '';
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        handleInputChange('location.state', e.target.value);
    };

    const handleInputChange = (name, value) => {
        if (name === 'phone') {
            value = formatPhoneNumber(value);
        }
        const error = validateField(name, value);
        setErrors(prevErrors => ({ ...prevErrors, [name]: error || '' }));
        handleChange('ResumeContactInfo', name, value);
    };

    const handleGrammarCheck = async () => {
        const textFields = ['location.city'];
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
            {errors.firstName && <div className="error-message">{errors.firstName}</div>}

            <label>Last Name</label>
            <input
                type="text"
                name="lastName"
                value={data.lastName}
                placeholder="Last Name"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {errors.lastName && <div className="error-message">{errors.lastName}</div>}

            <label>Email Address</label>
            <input
                type="text"
                name="email"
                value={data.email}
                placeholder="Email Address"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}

            <label>City</label>
            <input
                type="text"
                name="location.city"
                value={data.location.city}
                placeholder="City"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {errors['location.city'] && <div className="error-message">{errors['location.city']}</div>}

            <label>State</label>
            <StateDropdown value={selectedState} onChange={handleStateChange} />

            <label>Phone</label>
            <input
                type="text"
                name="phone"
                value={data.phone}
                placeholder="Phone"
                onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}

            <PronounsDropdown
                value={data.pronouns}
                onChange={(value) => handleInputChange('pronouns', value)}
                customPronouns={data.customPronouns}
                onCustomPronounsChange={(value) => handleInputChange('customPronouns', value)}
            />

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

export default ResumeContactInfo;
