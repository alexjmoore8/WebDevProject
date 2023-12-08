import React from 'react';

function ResumeEducation({ data, handleChange }) {
    return (
        <div>
            <h2>Education</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeEducation', e.target.name, e.target.value)}
            />

            <label>School</label>
            <input
                type="text"
                name="school.institution"
                value={data.school.institution}
                placeholder="School/Institution"
                onChange={(e) => handleChange('ResumeEducation', e.target.name, e.target.value)}
            />

            <label>Location</label>
            <input
                type="text"
                name="school.location"
                value={data.school.location}
                placeholder="Location"
                onChange={(e) => handleChange('ResumeEducation', 'school.location', e.target.value)}
            />

            <label>Degree</label>
            <input
                type="text"
                name="school.degree"
                value={data.school.degree}
                placeholder="Degree"
                onChange={(e) => handleChange('ResumeEducation', 'school.degree', e.target.value)}
            />

            <label>Major</label>
            <input
                type="text"
                name="school.major"
                value={data.school.major}
                placeholder="Major"
                onChange={(e) => handleChange('ResumeEducation', 'school.major', e.target.value)}
            />

            <label>Start Date</label>
            <input
                type="text"
                name="school.startDate"
                value={data.school.startDate}
                placeholder="Start Date"
                onChange={(e) => handleChange('ResumeEducation', 'school.startDate', e.target.value)}
            />

            <label>End Date</label>
            <input
                type="text"
                name="school.endDate"
                value={data.school.endDate}
                placeholder="End Date"
                onChange={(e) => handleChange('ResumeEducation', 'school.endDate', e.target.value)}
            />

            <label>GPA</label>
            <input
                type="text"
                name="school.gpa"
                value={data.school.gpa}
                placeholder="GPA"
                onChange={(e) => handleChange('ResumeEducation', 'school.gpa', e.target.value)}
            />
        </div>
    );
}

export default ResumeEducation;
