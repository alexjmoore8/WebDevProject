import React from 'react';

const VolunteerExperienceSection = ({ volunteerExperience }) => {
  if (!volunteerExperience || !volunteerExperience.job || !Array.isArray(volunteerExperience.job)) {
    // Return some default content or a message indicating the data is not available
    return <div>No work experience data available.</div>;
  }

  const renderJob = (job) => {
    const { position, organization, location, startDate, endDate } = job;

    return (
      <div key={`${position}-${organization}`}>
        <div>{position}</div>
        <div>{organization}</div>
        <div>{location}</div>
        <div>{startDate} - {endDate}</div>
      </div>
    );
  };

  return (
    <div>
      <div>{volunteerExperience.sectionHeading}</div>
      {volunteerExperience.job.map((job, index) => renderJob(job))}
    </div>
  );
}

export default VolunteerExperienceSection;
