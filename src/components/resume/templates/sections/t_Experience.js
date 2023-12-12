import React from 'react';

const WorkExperienceSection = ({ experience }) => {
  if (!experience || !experience.job || !Array.isArray(experience.job)) {
    return <div className="experience-section">No work experience data available.</div>;
  }

  return (
    <div className="experience-section">
      <div className="experience-heading"><h2>{experience.sectionHeading}</h2></div>
      {experience.job.map((job, index) => (
        <div key={index} className="job-item">
          <div className="job-position"><h3>{job.position}</h3></div>
          <div className="job-organization"><h4>{job.organization}</h4></div>
          <div className="job-location"><h5>{job.location.city}, {job.location.state}</h5></div>
          <div className="job-dates"><h6>{`${job.startDate} - ${job.endDate}`}</h6></div>
          <div className="job-description">{job.description}</div>
          <div className="bullets">
            <ul>
              {job.bullets.map((bullet, bulletIndex) => (
                <li key={bulletIndex}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkExperienceSection;
