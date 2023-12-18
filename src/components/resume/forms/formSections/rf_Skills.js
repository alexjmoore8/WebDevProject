import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import "../css/list.css"

function ResumeSkills({ data, handleChange }) {
    const initialSkills = data.skills || [{}];
    const [skills, setSkills] = useState(initialSkills);
    const [grammarSuggestions, setGrammarSuggestions] = useState([]);
    const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

  const handleAddSkill = () => {
    if (skills.length < 40) {
      setSkills([...skills, {}]);
      if (skills[skills.length - 1].level && skills[skills.length - 1].level !== 'Select Skill Level') {
      setSkills([...skills, {}]);
        } else {
        alert('Please select a valid skill level for the previous skill entry.');
        }
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

    const skillLevels = ['Select Skill Level', 'Beginner', 'Intermediate', 'Advanced', 'Other'];

    const handleGrammarCheck = async () => {
    try {
        let textToCheck = skills
            .map(skill => `${data.sectionHeading || ''} ${skill.skill || ''} ${skill.level === 'Other' ? skill.otherLevel : skill.level || ''}`)
            .join('. ');

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

  const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Skills' : 'Skills';
  };

    return (
        <div>
            <h2>Skills</h2>
            <label>Section Title</label>
            <label>
            <input
            type="checkbox"
            name="includeCustomTitle"
            checked={includeCustomTitle}
            onChange={(e) => setIncludeCustomTitle(e.target.checked)}
            />
            Include Custom Section Title
        </label>

        <input
            type="text"
            name="sectionHeading"
            value={getDefaultSectionTitle()}
            placeholder="Section title to display on resume"
            onChange={(e) => handleChange('ResumeSkills', e.target.name, e.target.value)}
            disabled={!includeCustomTitle}
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

                    <button className="list-button" onClick={() => handleRemoveSkill(index)}>Remove</button>
                 </div>
             ))}

             {skills.length < 20 && (
                 <button className="list-button" onClick={handleAddSkill}>Add</button>
             )}

         <button className="grammar-button" onClick={handleGrammarCheck}>Check Grammar</button>
         </div>
     );
}

export default ResumeSkills;