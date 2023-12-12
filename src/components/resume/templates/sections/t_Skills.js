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
          <div className="skill-name"><h3>{skill.skill}</h3></div>
          <div className="skill-level"><h6>{`Level: ${skill.level}`}</h6></div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
