import React from 'react';

const WorkExperienceSection = ({ experience }) => {
  if (!experience || !experience.job || !Array.isArray(experience.job)) {
    return <div>No work experience data available.</div>;
  }

  return (
    <div>
      <div>{experience.sectionHeading}</div>
      {experience.job.map((job, index) => (
        <div key={index}>
          <div>{job.position}</div>
          <div>{job.organization}</div>
          <div>{job.location.city}, {job.location.state}</div>
          <div>{`${job.startDate} - ${job.endDate}`}</div>
        </div>
      ))}
    </div>
  );
}

export default WorkExperienceSection;
