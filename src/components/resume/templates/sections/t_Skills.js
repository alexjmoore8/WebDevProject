import React from 'react';
import { processItems } from '../../../../helper/ComparisonFunctions.js';

const SkillsSection = ({ skills }) => {
  if (!skills || !skills.skills || !Array.isArray(skills.skills)) {
    return <div className="skills-section">No skill data available.</div>;
  }

const uniqueNames = {};
  const filteredSkills = skills.skills.filter((skills, index) => {
    if (!uniqueNames[skills.skill]) {
        uniqueNames[skills.skill] = true;
        return true;
      }
      return false;
    });

  const limitedSkills = filteredSkills.slice(0, 10);

  return (
    <div className="skills-section">
      <div className="skills-heading"><h2>{skills.sectionHeading}</h2></div>
      {limitedSkills.map((skill, index) => (
        <div key={index}>
          <div className="skill-item"><h6>{skill.skill}, {skill.level}</h6></div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
