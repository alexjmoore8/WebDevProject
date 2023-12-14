import React, { useState } from 'react';
import Typo from 'typo-js';
import StateDropdown from './sectionComponents/state.js';
import PronounsDropdown from './sectionComponents/pronouns.js';

function ResumeContactInfo({ data, handleChange }) {
  const [selectedState, setSelectedState] = useState('');
  const [errors, setErrors] = useState({});
  const dictionary = new Typo('en_US');

  const validateForm = () => {
    const newErrors = {};

    if (!data.firstName) {
      newErrors.firstName = 'First Name is required';
    } else if (!isSpellingValid(data.firstName)) {
      newErrors.firstName = 'Invalid spelling in First Name';
    }

    if (!data.lastName) {
      newErrors.lastName = 'Last Name is required';
    } else if (!isSpellingValid(data.lastName)) {
      newErrors.lastName = 'Invalid spelling in Last Name';
    }

    if (!data.email) {
      newErrors.email = 'Email Address is required';
    } else if (!isValidEmail(data.email)) {
      newErrors.email = 'Invalid Email Address';
    }

    if (!data.location.city) {
      newErrors.city = 'City is required';
    } else if (!isSpellingValid(data.location.city)) {
      newErrors.city = 'Invalid spelling in City';
    }

    if (!selectedState) {
      newErrors.state = 'State is required';
    }

    if (!data.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!isValidPhone(data.phone)) {
      newErrors.phone = 'Invalid Phone Number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', data);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/; 
    return phoneRegex.test(phone);
  };

  const isSpellingValid = (text) => {
    return dictionary.check(text);
  };

  return (
    <div>
      <h2>Contact Info</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={data.firstName}
          placeholder="First Name"
          onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={data.lastName}
          placeholder="Last Name"
          onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}

        <label>Email Address</label>
        <input
          type="text"
          name="email"
          value={data.email}
          placeholder="Email Address"
          onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label>City</label>
        <input
          type="text"
          name="location.city"
          value={data.location.city}
          placeholder="City"
          onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />
        {errors.city && <span className="error">{errors.city}</span>}

        <label>State</label>
        <div>
          <StateDropdown value={selectedState} handleChange={(e) => setSelectedState(e.target.value)} />
        </div>
        {errors.state && <span className="error">{errors.state}</span>}

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={data.phone}
          placeholder="Phone"
          onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <PronounsDropdown
          value={data.pronouns}
          onChange={(value) => handleChange('ResumeContactInfo', 'pronouns', value)}
          customPronouns={data.customPronouns}
          onCustomPronounsChange={(value) => handleChange('ResumeContactInfo', 'customPronouns', value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default ResumeContactInfo;
