import React from 'react';

function ResumeSkills({ data, handleChange }) {
    return (
        <div>
            <h2>Skills</h2>
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeSkills', e.target.name, e.target.value)}
            />

            <label>Skill Name</label>
            <input
                type="text"
                name="skills.skill"
                value={data.skills.skill}
                placeholder="Skill"
                onChange={(e) => handleChange('ResumeSkills', 'skill.name', e.target.value)}
            />

            <label>Level</label>
            <input
                type="text"
                name="skills.level"
                value={data.skills.level}
                placeholder="Skill Level"
                onChange={(e) => handleChange('ResumeSkills', 'skill.level', e.target.value)}
            />
        </div>
    );
}

export default ResumeSkills;
