import React, { useState } from 'react';

function ResumeCourses({ data, handleChange }) {
  const [courses, setCourses] = useState(data.courses || [{}]);

  const handleAddCourse = () => {
    if (courses.length < 25) {
      setCourses([...courses, {}]);
    }
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  return (
    <div>
      <h2>Courses</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeCourses', e.target.name, e.target.value)}
      />

      {courses.map((course, index) => (
        <div key={index}>
          <label>Course Name</label>
          <input
            type="text"
            name={`courses[${index}].title`}
            value={course.title || ''}
            placeholder="Course Name"
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />

          <label>School</label>
          <input
            type="text"
            name={`courses[${index}].school`}
            value={course.school || ''}
            placeholder="School"
            onChange={(e) => handleInputChange(index, 'school', e.target.value)}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`courses[${index}].tags`}
            value={course.tags ? course.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => {
              const tagsArray = e.target.value.split(', ').filter((tag) => tag.trim() !== '');
              handleInputChange(index, 'tags', tagsArray);
            }}
          />

          <button onClick={() => handleRemoveCourse(index)}>Remove</button>
        </div>
      ))}

      {courses.length < 25 && (
        <button onClick={handleAddCourse}>Add Course</button>
      )}
    </div>
  );
}

export default ResumeCourses;
