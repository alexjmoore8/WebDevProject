import React, { useState } from 'react';

function ResumeSkills({ data, handleChange }) {
    const initialSkills = data.skills || [{}];
  const [skills, setSkills] = useState(initialSkills);

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
