import React, { useState } from 'react';
import { contactInfoSchema } from "../resumeSubSchemas.js";
// TODO: implement placeholder/shadow text
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import StateDropdown from './sectionComponents/state.js';
import PronounsDropdown from './sectionComponents/pronouns.js';

function ResumeContactInfo({data, handleChange}) {
    const handleCheckboxChange = (name) => {
        handleChange('ResumeContactInfo', name, !data[name]);
    };


  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
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
            onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />

        <label>Last Name</label>
        <input
            type="text"
            name="lastName"
            value={data.lastName}
            placeholder="Last Name"
            onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />

        <label>Email Address</label>
        <input
            type="text"
            name="email"
            value={data.email}
            placeholder="Email Address"
            onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />

        <label>City</label>
        <input
            type="text"
            name="location.city"
            value={data.location.city}
            placeholder="City"
            onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />

        <label>State</label>
        <div>
            <StateDropdown value={selectedState} handleChange={handleStateChange} />
        </div>

        <label>Phone</label>
        <input
            type="text"
            name="phone"
            value={data.phone}
            placeholder="Phone"
            onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
        />

        <PronounsDropdown
                value={data.pronouns}
                onChange={(value) => handleChange('ResumeContactInfo', 'pronouns', value)}
                customPronouns={data.customPronouns}
                onCustomPronounsChange={(value) => handleChange('ResumeContactInfo', 'customPronouns', value)}
            />
    </div>
)};

export default ResumeContactInfo;
    