import React from 'react';

const SkillsSection = ({ skills }) => {
  if (!skills || !skills.skills || !Array.isArray(skills.skills)) {
    return <div className="skills-section">No skill data available.</div>;
  }

  return (
    <div className="skills-section">
      <div className="skills-heading">{skills.sectionHeading}</div>
      {skills.skills.map((skill, index) => (
        <div key={index} className="skill-item">
          <div className="skill-name">{skill.skill}</div>
          <div className="skill-level">{`Level: ${skill.level}`}</div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
