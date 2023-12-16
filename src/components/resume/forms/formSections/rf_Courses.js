import React, { useState } from 'react';
import "../css/results.css"
function ResumeCourses({ data, handleChange }) {
  const [courses, setCourses] = useState(data.courses || [{}]);
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);

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
const handleGrammarCheck = async () => {
  try {
    let textToCheck = courses.map(course => 
      `${data.sectionHeading || ''} ${course.title || ''} ${course.school || ''} ${course.tags?.join(', ') || ''}`
    ).join('. ');

    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `language=en-US&text=${encodeURIComponent(textToCheck)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setGrammarSuggestions(result.matches);
  } catch (error) {
    console.error('Error fetching grammar check data:', error);
    alert('Error fetching grammar check data. See console for details.');
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
     <button onClick={handleGrammarCheck}>Check Grammar</button>

      {grammarSuggestions.length > 0 && (
    <div className="grammar-suggestions-container">
        <h3>Grammar Suggestions</h3>
        <ul className="grammar-suggestions-list">
            {grammarSuggestions.map((suggestion, index) => (
                <li key={index}>
                    <span>{suggestion.message}</span> - Found: <span className="suggestion-context">"{suggestion.context.text}"</span>
                    {suggestion.replacements.length > 0 && (
                        <div>
                            Suggestion: 
                            <span className="suggestion-replacement"
                                  dangerouslySetInnerHTML={{ __html: `"${suggestion.replacements.map(rep => rep.value).join(', ')}"` }}>
                            </span>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    </div>
)}
    </div>
  );
}

export default ResumeCourses;
