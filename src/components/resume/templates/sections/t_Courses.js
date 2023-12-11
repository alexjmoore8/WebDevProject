import React from 'react';

const CoursesSection = ({ courses }) => {
  if (!courses || !courses.course || !Array.isArray(courses.course)) {
    return <div>No course data available.</div>;
  }

  return (
    <div>
      <div><h2>{courses.sectionHeading}</h2></div>
      {courses.course.map((course, index) => (
        <div key={index}>
          <div>{course.title}</div>
          <div>{course.school}</div>
          <div>{`Tags: ${course.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default CoursesSection;
