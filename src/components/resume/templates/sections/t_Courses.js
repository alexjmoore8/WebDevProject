import React from 'react';
import { processItems } from '../../../../helper/ComparisonFunctions.js';

const CoursesSection = ({ courses }) => {
  if (!courses || !courses.course || !Array.isArray(courses.course)) {
    return <div className="courses-section">No course data available.</div>;
  }

  const jobTags = [
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'otherStuff', 
    'stuff',
    'things'
  ];

  const sortedCourses = processItems(courses.course, jobTags, 'title');

  const limitedCourses = sortedCourses.slice(0, 10);

  return (
    <div className="courses-section">
      <div className="courses-heading"><h2>{courses.sectionHeading}</h2></div>
      {limitedCourses.map((course, index) => (
        <div key={index} className="course-item">
          <div className="course-title"><h3>{course.title}</h3></div>
          <div className="course-school"><h4>{course.school}</h4></div>
        </div>
      ))}
    </div>
  );
}

export default CoursesSection;
