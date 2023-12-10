import React from 'react';
import WorkExperienceSection from './t_WorkExperience.js';
import VolunteerExperienceSection from './t_VolunteerExperience.js';

const ExperienceContainer = ({ section, data }) => {
  console.log('Rendering ExperienceContainer with props:', { section, data });

  switch (section) {
    case 'workExperience':
      return <WorkExperienceSection workExperience={data} />;
    case 'volunteerExperience':
      return <VolunteerExperienceSection volunteerExperience={data} />;
    default:
      return null;
  }
};

export default ExperienceContainer;
