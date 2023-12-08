import React, { useState } from 'react';
import { socialsSchema } from "../resumeSubSchemas.js";
// TODO: implement placeholder/shadow text
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
import PlatformDropdown from './sectionComponents/platform.js';

function ResumeSocialMedia({data, handleChange}) {
    const handleCheckboxChange = (name) => {
        handleChange('ResumeSocialMedia', name, !data[name]);
    };

    const [selectedPlatform, setSelectedPlatform] = useState('');

    const handlePlatformChange = (e) => {
        setSelectedPlatform(e.target.value);
    };

    return (
        <div>
            <label>Social Media Profiles</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume" 
                onChange={(e) => handleChange('ResumeSocialMedia', e.target.name, e.target.value)}
            />

            <label>Name???</label>
            <input
                type="text"
                name="name"
                value={data.name}
                placeholder="I don't remember what this is for" 
                onChange={(e) => handleChange('ResumeSocialMedia', e.target.name, e.target.value)}
            />

            <label>Link</label>
            <input
                type="text"
                name="link"
                value={data.link}
                placeholder="Profile Link" 
                onChange={(e) => handleChange('ResumeSocialMedia', e.target.name, e.target.value)}
            />

            <label>Type</label>
            <div>
                <PlatformDropdown value={selectedPlatform} handleChange={handlePlatformChange} />
            </div>



            
        </div>
)};

export default ResumeSocialMedia;
    

// import React, { useState } from 'react';
// import { socialsSchema } from "../resumeSubSchemas.js";
// import PlatformDropdown from './sectionComponents/platform.js';

// function ResumeSocialMedia({ data, handleChange }) {
//     const handleCheckboxChange = (name) => {
//         handleChange('ResumeSocialMedia', name, !data[name]);
//     };

//     const [selectedPlatform, setSelectedPlatform] = useState('');

//     const handleInputChange = (name, value) => {
//         handleChange('ResumeSocialMedia', name, value);
//     };

//     const handlePlatformChange = (e) => {
//         setSelectedPlatform(e.target.value);
//     };

//     return (
//         <div>
//             <label>Social Media Profiles</label>
//             {['sectionHeading', 'name', 'link'].map((fieldName) => (
//                 <input
//                     key={fieldName}
//                     type="text"
//                     name={fieldName}
//                     value={data[fieldName]}
//                     placeholder={fieldName === 'sectionHeading' ? 'Section title to display on resume' :
//                         (fieldName === 'name' ? "I don't remember what this is for" : 'Profile Link')}
//                     onChange={(e) => handleInputChange(fieldName, e.target.value)}
//                 />
//             ))}

//             <label>Type</label>
//             <div>
//                 <PlatformDropdown value={selectedPlatform} handleChange={handlePlatformChange} />
//             </div>
//         </div>
//     );
// }

// export default ResumeSocialMedia;
