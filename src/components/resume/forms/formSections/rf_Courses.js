import React, { useState } from 'react';
import Typo from 'typo-js';

function ResumeCourses({ data, handleChange }) {
  const [courses, setCourses] = useState(data.courses || [{}]);
  const [errors, setErrors] = useState({});
  const dictionary = new Typo('en_US');

  const handleAddCourse = () => {
    if (courses.length < 12) {
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

  const validateTitle = (title) => {
    return title.trim() !== '' && isSpellingValid(title);
  };

  const validateSchool = (school) => {
    return school.trim() !== '' && isSpellingValid(school);
  };

  const validateTags = (tags) => {
    const tagsArray = tags.split(',').map((tag) => tag.trim());
    return tagsArray.every((tag) => tag !== '') && isSpellingValid(tagsArray.join(', '));
  };

  const isSpellingValid = (text) => {
    return dictionary.check(text);
  };

  const handleSubmit = () => {
    const validationErrors = {};

    courses.forEach((course, index) => {
      if (!validateTitle(course.title)) {
        validationErrors[`courses[${index}].title`] = 'Title is required or contains misspelled words';
      }
      if (!validateSchool(course.school)) {
        validationErrors[`courses[${index}].school`] = 'School is required or contains misspelled words';
      }
      if (!validateTags(course.tags || '')) {
        validationErrors[`courses[${index}].tags`] = 'Invalid tags or contains misspelled words';
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', courses);
    }
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
          {errors[`courses[${index}].title`] && (
            <div className="error">{errors[`courses[${index}].title`]}</div>
          )}

          <label>School</label>
          <input
            type="text"
            name={`courses[${index}].school`}
            value={course.school || ''}
            placeholder="School"
            onChange={(e) => handleInputChange(index, 'school', e.target.value)}
          />
          {errors[`courses[${index}].school`] && (
            <div className="error">{errors[`courses[${index}].school`]}</div>
          )}

          <label>Tags</label>
          <input
            type="text"
            name={`courses[${index}].tags`}
            value={course.tags ? course.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => {
              const tagsArray = e.target.value.split(',').map((tag) => tag.trim());
              handleInputChange(index, 'tags', tagsArray);
            }}
          />
          {errors[`courses[${index}].tags`] && (
            <div className="error">{errors[`courses[${index}].tags`]}</div>
          )}

          <button onClick={() => handleRemoveCourse(index)}>Remove</button>
        </div>
      ))}

      {courses.length < 12 && (
        <button onClick={handleAddCourse}>Add Course</button>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ResumeCourses;
