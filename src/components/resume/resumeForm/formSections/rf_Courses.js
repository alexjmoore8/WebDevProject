import React from 'react';

function ResumeCourses({ data, handleChange }) {
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

            <label>Course Name</label>
            <input
                type="text"
                name="course.title"
                value={data.course.title}
                placeholder="Course Name"
                onChange={(e) => handleChange('ResumeCourses', 'course.name', e.target.value)}
            />

            <label>School</label>
            <input
                type="text"
                name="course.school"
                value={data.course.school}
                placeholder="School"
                onChange={(e) => handleChange('ResumeCourses', 'course.school', e.target.value)}
            />

            <label>Tags</label>
            <input
                type="text"
                name="course.tags"
                value={data.course.tags.join(', ')} // Join array elements into a string
                placeholder="Tags (comma-separated)"
                onChange={(e) => handleChange('ResumeCourses', 'course.tags', e.target.value.split(', '))}
            />
        </div>
    );
}

export default ResumeCourses;
