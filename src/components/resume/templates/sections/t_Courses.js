import React from 'react';

const CoursesSection = ({ courses }) => {
  if (!courses || !courses.course || !Array.isArray(courses.course)) {
    return <div className="courses-section">No course data available.</div>;
  }

  const uniqueTitles = {};
  const filteredCourses = courses.course.filter((course, index) => {
    if (!uniqueTitles[course.title]) {
        uniqueTitles[course.title] = true;
        return true;
      }
      return false;
    });

  // TODO add tag comparison
  const limitedCourses = filteredCourses.slice(0, 10);

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
