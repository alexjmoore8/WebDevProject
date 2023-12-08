import React from 'react';

function ResumeCertifications({ data, handleChange }) {
    return (
        <div>
            <h2>Certifications</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeCertifications', e.target.name, e.target.value)}
            />

            <label>Certification Name</label>
            <input
                type="text"
                name="certification.name"
                value={data.certification.name}
                placeholder="Certification Name"
                onChange={(e) => handleChange('ResumeCertifications', 'certification.name', e.target.value)}
            />

            <label>Organization</label>
            <input
                type="text"
                name="certification.organization"
                value={data.certification.organization}
                placeholder="Organization"
                onChange={(e) => handleChange('ResumeCertifications', 'certification.organization', e.target.value)}
            />

            <label>Date</label>
            <input
                type="text"
                name="certification.date"
                value={data.certification.date}
                placeholder="Date"
                onChange={(e) => handleChange('ResumeCertifications', 'certification.date', e.target.value)}
            />

            <label>Tags</label>
            <input
                type="text"
                name="certification.tags"
                value={data.certification.tags.join(', ')} // Join array elements into a string
                placeholder="Tags (comma-separated)"
                onChange={(e) => handleChange('ResumeCertifications', 'certification.tags', e.target.value.split(', '))}
            />
        </div>
    );
}

export default ResumeCertifications;
