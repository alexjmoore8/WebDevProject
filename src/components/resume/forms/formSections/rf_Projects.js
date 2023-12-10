import React from 'react';

function ResumeProjects({ data, handleChange }) {
    return (
        <div>
            <h2>Projects</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumeProjects', e.target.name, e.target.value)}
            />

            <label>Project Title</label>
            <input
                type="text"
                name="project.title"
                value={data.project.title}
                placeholder="Project Title"
                onChange={(e) => handleChange('ResumeProjects', 'project.title', e.target.value)}
            />

            <label>Description</label>
            <textarea
                name="project.description"
                value={data.project.description}
                placeholder="Project Description"
                onChange={(e) => handleChange('ResumeProjects', 'project.description', e.target.value)}
            />

            <label>Link</label>
            <input
                type="text"
                name="project.link"
                value={data.project.link}
                placeholder="Link"
                onChange={(e) => handleChange('ResumeProjects', 'project.link', e.target.value)}
            />

            <label>Tags</label>
            <input
                type="text"
                name="project.tags"
                value={data.project.tags.join(', ')} // Join array elements into a string
                placeholder="Tags (comma-separated)"
                onChange={(e) => handleChange('ResumeProjects', 'project.tags', e.target.value.split(', '))}
            />
        </div>
    );
}

export default ResumeProjects;
