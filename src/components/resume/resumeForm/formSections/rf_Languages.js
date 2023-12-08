import React from 'react';

function ResumeLanguages({ data, handleChange }) {
    return (
        <div>
            <h2>Languages</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeLanguages', e.target.name, e.target.value)}
            />

            <label>Language</label>
            <input
                type="text"
                name="language.language"
                value={data.languages.language}
                placeholder="Language"
                onChange={(e) => handleChange('ResumeLanguages', 'language.language', e.target.value)}
            />

            <label>Level</label>
            <input
                type="text"
                name="language.level"
                value={data.languages.level}
                placeholder="Level"
                onChange={(e) => handleChange('ResumeLanguages', 'language.level', e.target.value)}
            />
        </div>
    );
}

export default ResumeLanguages;
