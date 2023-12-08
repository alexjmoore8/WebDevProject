import React from 'react';

function ResumeAbout({ data, handleChange }) {
    return (
        <div>
            <h2>About</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
            />

            <label>Summary</label>
            <textarea
                name="summary"
                value={data.summary}
                placeholder="Write a brief summary about yourself"
                onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
            />
        </div>
    );
}

export default ResumeAbout;
