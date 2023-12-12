// TODO gpa tag?
import React from 'react';

const EducationSection = ({ education }) => {
  if (!education || !education.school || !Array.isArray(education.school)) {
    return <div className="education-section">No education data available.</div>;
  }

  const renderSchool = (school) => {
    const { institution, location, degree, major, startDate, endDate, gpa } = school;

    return (
      <div key={`${institution}-${degree}`} className="education-school">
        <div className="education-degree"><h3>{degree}, {major}</h3></div>
        <div className="education-institution"><h4>{institution}</h4><h6 className="gpa">{gpa ? ` / GPA ${gpa}` : ''}</h6></div>
        <div className="education-location"><h5>{`${location.city}, ${location.state}`}</h5></div>
        <div className="education-dates"><h6>{`${startDate} - ${endDate}`}</h6></div>
      </div>
    );
  };

  return (
    <div className="education-section">
      <div className="education-heading"><h2>{education.sectionHeading}</h2></div>
      {education.school.map((school, index) => renderSchool(school))}
    </div>
  );
}

export default EducationSection;
