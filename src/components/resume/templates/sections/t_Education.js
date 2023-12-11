import React from 'react';

const EducationSection = ({ education }) => {
  if (!education || !education.school || !Array.isArray(education.school)) {
    return <div>No education data available.</div>;
  }

  const renderSchool = (school) => {
    const { institution, location, degree, major, startDate, endDate, gpa } = school;

    return (
      <div key={`${institution}-${degree}`}>
        <div>{institution}</div>
        <div>{`${location.city}, ${location.state}`}</div>
        <div>{`${degree} in ${major}`}</div>
        <div>{`Dates: ${startDate} - ${endDate}`}</div>
        <div>{`GPA: ${gpa}`}</div>
      </div>
    );
  };

  return (
    <div>
      <div>{education.sectionHeading}</div>
      {education.school.map((school, index) => renderSchool(school))}
    </div>
  );
}

export default EducationSection;
