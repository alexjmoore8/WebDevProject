import React from 'react';

const EducationSection = ({ education }) => {
  if (!education || !education.school || !Array.isArray(education.school)) {
    return <div>No education data available.</div>;
  }

  const renderSchool = (school) => {
    const { institution, location, degree, major, startDate, endDate, gpa } = school;

    return (
      <div key={`${institution}-${degree}`}>
        <div>{degree}, {major}</div>
        <div>{institution}{gpa ? ` / GPA ${gpa}` : ''}</div>
        <div>{`${location.city}, ${location.state}`}</div>
        <div>{`${startDate} - ${endDate}`}</div>
      </div>
    );
  };

  return (
    <div>
      <div><h2>{education.sectionHeading}</h2></div>
      {education.school.map((school, index) => renderSchool(school))}
    </div>
  );
}

export default EducationSection;
