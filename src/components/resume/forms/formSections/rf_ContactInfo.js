import React, { useState } from 'react';
import CityStateInput from './sectionComponents/cityState.js';
import PronounsDropdown from './sectionComponents/pronouns.js';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import "../css/results.css"

function ResumeContactInfo({ data, handleChange, handleNextClick }) {
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

           <CityStateInput
            cityValue={data.location.city}
            onCityChange={(e) => handleInputChange('location.city', e.target.value)}
            stateValue={data.location.state}
            onStateChange={(state) => handleInputChange('location.state', state)}
            />

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

            <GrammarCheck data={data} handleChange={handleChange} />
        </div>
    );
}

export default ResumeContactInfo;
