import React from 'react';

const SkillsSection = ({ skills }) => {
  if (!skills || !skills.skills || !Array.isArray(skills.skills)) {
    return <div className="skills-section">No skill data available.</div>;
  }

  return (
    <div className="skills-section">
      <div className="skills-heading"><h2>{skills.sectionHeading}</h2></div>
      {skills.skills.map((skill, index) => (
        <div key={index}>
          <div className="skill-item"><h6>{skill.skill}, {skill.level}</h6></div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
