import React from 'react';

const CoursesSection = ({ courses }) => {
  if (!courses || !courses.course || !Array.isArray(courses.course)) {
    return <div className="courses-section">No course data available.</div>;
  }

  return (
    <div className="courses-section">
      <div className="courses-heading"><h2>{courses.sectionHeading}</h2></div>
      {courses.course.map((course, index) => (
        <div key={index} className="course-item">
          <div className="course-title"><h3>{course.title}</h3></div>
          <div className="course-school"><h4>{course.school}</h4></div>
          <div className="tags">{`Tags: ${course.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default CoursesSection;
