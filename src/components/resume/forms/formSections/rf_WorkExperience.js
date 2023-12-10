import React from 'react';

function ResumeWorkExperience({ data, handleChange }) {
    return (
        <div>
            <h2>Work Experience</h2>
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeWorkExperience', e.target.name, e.target.value)}
            />

            <label>Job Title</label>
            <input
                type="text"
                name="job.position"
                value={data.job.position}
                placeholder="Job position"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.title', e.target.value)}
            />

            <label>Company</label>
            <input
                type="text"
                name="job.organization"
                value={data.job.organization}
                placeholder="Company"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.company', e.target.value)}
            />

            <label>Location</label>
            <input
                type="text"
                name="job.location"
                value={data.job.location}
                placeholder="Location"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.location', e.target.value)}
            />

            <label>Start Date</label>
            <input
                type="text"
                name="job.startDate"
                value={data.job.startDate}
                placeholder="Start Date"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.startDate', e.target.value)}
            />

            <label>End Date</label>
            <input
                type="text"
                name="job.endDate"
                value={data.job.endDate}
                placeholder="End Date"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.endDate', e.target.value)}
            />

            <label>Bullets</label>
            <textarea
                name="job.bullets"
                value={data.job.bullets.join('\n')} // Join array elements into a string with newlines
                placeholder="Job Bullets (one per line)"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.bullets', e.target.value.split('\n'))}
            />

            <label>Tags</label>
            <input
                type="text"
                name="job.tags"
                value={data.job.tags.join(', ')} // Join array elements into a string
                placeholder="Tags (comma-separated)"
                onChange={(e) => handleChange('ResumeWorkExperience', 'job.tags', e.target.value.split(', '))}
            />
        </div>
    );
}

export default ResumeWorkExperience;
