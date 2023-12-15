import React, { useState } from 'react';

function ResumeSkills({ data, handleChange }) {
    const initialSkills = data.skills || [{}];
    const [skills, setSkills] = useState(initialSkills);
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);

    const handleAddSkill = () => {
        if (skills.length < 20) {
            setSkills([...skills, {}]);
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleInputChange = (index, field, value) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    }

    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Other'];

    const handleGrammarCheck = async () => {
        try {
            let textToCheck = skills.map(skill => skill.skill || '').join('. ');

            const response = await fetch('https://api.languagetool.org/v2/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `language=en-US&text=${encodeURIComponent(textToCheck)}`,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setGrammarSuggestions(result.matches);
        } catch (error) {
            console.error('Error fetching grammar check data:', error);
        }
    };

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

            {skills.map((skill, index) => (
                <div key={index}>
                    <label>Skill Name</label>
                    <input
                        type="text"
                        name={`skills[${index}].skill`}
                        value={skill.skill}
                        placeholder="Skill"
                        onChange={(e) => handleInputChange(index, 'skill', e.target.value)}
                    />

                    <label>Level</label>
                    <select
                        name={`skills[${index}].level`}
                        value={skill.level}
                        onChange={(e) => handleInputChange(index, 'level', e.target.value)}
                    >
                        {skillLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>

                    {skill.level === 'Other' && (
                        <input
                            type="text"
                            placeholder="Other Level"
                            value={skill.otherLevel || ''}
                            onChange={(e) => handleInputChange(index, 'otherLevel', e.target.value)}
                        />
                    )}

                    <button onClick={() => handleRemoveSkill(index)}>Remove</button>
                </div>
            ))}

            {skills.length < 20 && (
                <button onClick={handleAddSkill}>Add Skill</button>
            )}

            <button onClick={handleGrammarCheck}>Check Grammar</button>

            {grammarSuggestions.length > 0 && (
                <div>
                    <h3>Grammar Suggestions</h3>
                    <ul>
                        {grammarSuggestions.map((suggestion, index) => (
                            <li key={index}>
                                {suggestion.message} - Found: "{suggestion.context.text}"
                                {suggestion.replacements.length > 0 && 
                                    ` Suggestion: "${suggestion.replacements.map(rep => rep.value).join(', ')}"`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ResumeSkills;
