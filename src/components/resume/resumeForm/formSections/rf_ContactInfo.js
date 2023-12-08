import React, { useState } from 'react';
import { contactInfoSchema } from "../resumeSubSchemas.js";
// TODO: implement placeholder/shadow text
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import StateDropdown from './sectionComponents/state.js';

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
            <label>Contact Info</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume" 
                onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
            />

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
                name="LastName"
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
                name="city"
                value={data.location.city}
                placeholder="City" 
                onChange={(e) => handleChange('ResumeContactInfo', e.target.name, e.target.value)}
            />

            <label>State</label>
            <div>
            <label>State:</label>
                <StateDropdown value={selectedState} handleChange={handleStateChange} />
            </div>

            {/* <label>Style:</label>
            <select
                name="style"
                value={data.style}
                onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
            >
                <option value="style1">Style 1</option>
                <option value="style2">Style 2</option>
                <option value="style3">Style 3</option>
            </select>

            <label>Sections:</label>
            <div>
                <label>
                <input
                    type="checkbox"
                    name="contact"
                    checked={data.contact}
                    onChange={() => handleCheckboxChange('contact')}
                />
                ContactInfo
                </label>

                <label>
                <input
                    type="checkbox"
                    name="socials"
                    checked={data.socials}
                    onChange={() => handleCheckboxChange('socials')}
                />
                Social Media & Website
                </label>

                <label>
                <input
                    type="checkbox"
                    name="about"
                    checked={data.about}
                    onChange={() => handleCheckboxChange('about')}
                />
                About
                </label>
                
                <label>
                <input
                    type="checkbox"
                    name="education"
                    checked={data.education}
                    onChange={() => handleCheckboxChange('education')}
                />
                Education
                </label>

                <label>
                <input
                    type="checkbox"
                    name="courses"
                    checked={data.courses}
                    onChange={() => handleCheckboxChange('courses')}
                />
                Courses
                </label>

                <label>
                <input
                    type="checkbox"
                    name="certifications"
                    checked={data.certifications}
                    onChange={() => handleCheckboxChange('certifications')}
                />
                Certifications
                </label>

                <label>
                <input
                    type="checkbox"
                    name="publications"
                    checked={data.publications}
                    onChange={() => handleCheckboxChange('publications')}
                />
                Publications
                </label>

                <label>
                <input
                    type="checkbox"
                    name="languages"
                    checked={data.languages}
                    onChange={() => handleCheckboxChange('languages')}
                />
                Languages
                </label>

                <label>
                <input
                    type="checkbox"
                    name="projects"
                    checked={data.projects}
                    onChange={() => handleCheckboxChange('projects')}
                />
                Projects
                </label>

                <label>
                <input
                    type="checkbox"
                    name="workExperience"
                    checked={data.workExperience}
                    onChange={() => handleCheckboxChange('workExperience')}
                />
                Work Experience
                </label>

                <label>
                <input
                    type="checkbox"
                    name="volunteerExperience"
                    checked={data.volunteerExperience}
                    onChange={() => handleCheckboxChange('volunteerExperience')}
                />
                Volunteer Experience
                </label>

                <label>
                <input
                    type="checkbox"
                    name="skills"
                    checked={data.skills}
                    onChange={() => handleCheckboxChange('skills')}
                />
                Skills
                </label> */}
            
        </div>
)};

export default ResumeContactInfo;
    