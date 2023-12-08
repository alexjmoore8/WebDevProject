import React from 'react';

function ResumeVolunteerExperience({ data, handleChange }) {
    return (
        <div>
            <h2>Volunteer Experience</h2>
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeVolunteerExperience', e.target.name, e.target.value)}
            />

            <label>Position</label>
            <input
                type="text"
                name="job.position"
                value={data.job.position}
                placeholder="Position"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.position', e.target.value)}
            />

            <label>Organization</label>
            <input
                type="text"
                name="job.organization"
                value={data.job.organization}
                placeholder="Organization"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.organization', e.target.value)}
            />

            <label>Location</label>
            <input
                type="text"
                name="job.location"
                value={data.job.location}
                placeholder="Location"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.location', e.target.value)}
            />

            <label>Start Date</label>
            <input
                type="text"
                name="job.startDate"
                value={data.job.startDate}
                placeholder="Start Date"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.startDate', e.target.value)}
            />

            <label>End Date</label>
            <input
                type="text"
                name="job.endDate"
                value={data.job.endDate}
                placeholder="End Date"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.endDate', e.target.value)}
            />

            <label>Link</label>
            <input
                type="text"
                name="job.link"
                value={data.job.link}
                placeholder="Link"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.link', e.target.value)}
            />

            <label>Bullets</label>
            <textarea
                name="job.bullets"
                value={data.job.bullets.join('\n')} // Join array elements into a string with newlines
                placeholder="Volunteer Bullets (one per line)"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.bullets', e.target.value.split('\n'))}
            />

            <label>Tags</label>
            <input
                type="text"
                name="job.tags"
                value={data.job.tags.join(', ')} // Join array elements into a string
                placeholder="Tags (comma-separated)"
                onChange={(e) => handleChange('ResumeVolunteerExperience', 'job.tags', e.target.value.split(', '))}
            />
        </div>
    );
}

export default ResumeVolunteerExperience;
