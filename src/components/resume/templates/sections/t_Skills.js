import React from 'react';

const SkillsSection = ({ skills }) => {
  if (!skills || !skills.skills || !Array.isArray(skills.skills)) {
    // Return some default content or a message indicating the data is not available
    return <div>No skill data available.</div>;
  }

  return (
    <div>
      <div>{skills.sectionHeading}</div>
      {skills.skills.map((skill, index) => (
        <div key={index}>
          <div>{skill.skill}</div>
          <div>{`Level: ${skill.level}`}</div>
        </div>
      ))}
    </div>
  );
}

export default SkillsSection;
