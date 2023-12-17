import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import FormSectionHeader from './sectionComponents/SectionHeader.js';
import NameOrgInput from './sectionComponents/NameAndOrg.js';
import TagsInput from './sectionComponents/tags.js';
import "../css/results.css"

function ResumeCourses({ data, handleChange }) {
  const [courses, setCourses] = useState(data.courses || [{}]);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

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

  const getDefaultSectionTitle = () => {
    return includeCustomTitle ? data.sectionHeading || 'Courses' : 'Courses';
  };

  return (
    <div>
    <FormSectionHeader sectionName="Courses" data={data} handleChange={handleChange} />
      {courses.map((course, index) => (
        <div key={index}>
          
          <NameOrgInput
            index={index}
            data={course}
            handleChange={handleInputChange}
            label="Course"
          />

          <TagsInput
            value={course.tags || []}
            onChange={(tagsArray) => handleInputChange(index, 'tags', tagsArray)}
            label="Courses"
          />

          <button onClick={() => handleRemoveCourse(index)}>Remove</button>
        </div>
      ))}

      {courses.length < 25 && (
        <button onClick={handleAddCourse}>Add Course</button>
      )}
      <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumeCourses;
