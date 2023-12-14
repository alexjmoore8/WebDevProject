import React, { useState } from 'react';
import Typo from 'typo-js';

function ResumeSkills({ data, handleChange }) {
  const initialSkills = data.skills || [{}];
  const [skills, setSkills] = useState(initialSkills);

  const dictionary = new Typo('en_US');

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
  };

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Other'];

  const isTitleValid = (title) => title.trim() !== '';
  const isSkillValid = (skill) => skill.trim() !== '';
  const isLevelValid = (level) => skillLevels.includes(level) || level === 'Other';
  const isOtherLevelValid = (level, otherLevel) => level !== 'Other' || (level === 'Other' && otherLevel.trim() !== '');

  const isFormValid = (title, skill, level, otherLevel) => {
    return (
      isTitleValid(title) &&
      isSkillValid(skill) &&
      isLevelValid(level) &&
      isOtherLevelValid(level, otherLevel)
    );
  };

  const isSpellingValid = (text) => dictionary.check(text);

  return (
    <div>
      <h2>Skill</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeSkill', e.target.name, e.target.value)}
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
          {!isSkillValid(skill.skill) && (
            <div className="error-message">Invalid input. Please check your data.</div>
          )}
          {!isSpellingValid(skill.skill) && (
            <div className="error-message">Spelling error in the skill name.</div>
          )}

          <label>Level</label>
          <select
            name={`skills[${index}].level`}
            value={skill.level}
            onChange={(e) => handleInputChange(index, 'level', e.target.value)}
          >
            {skillLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
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

          {!isFormValid(data.sectionHeading, skill.skill, skill.level, skill.otherLevel) && (
            <div className="error-message">Invalid input. Please check your data.</div>
          )}

          <button onClick={() => handleRemoveSkill(index)}>Remove</button>
        </div>
      ))}

      {skills.length < 10 && (
        <button onClick={handleAddSkill}>Add Skill</button>
      )}
    </div>
  );
}

export default ResumeSkills;
