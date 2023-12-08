import React from 'react';

function ResumePublications({ data, handleChange }) {
    return (
        <div>
            <h2>Publications</h2>
            
            <label>Section Title</label>
            <input
                type="text"
                name="sectionHeading"
                value={data.sectionHeading}
                placeholder="Section title to display on resume"
                onChange={(e) => handleChange('ResumePublications', e.target.name, e.target.value)}
            />

            <label>Publication Title</label>
            <input
                type="text"
                name="publication.title"
                value={data.publication.title}
                placeholder="Publication Title"
                onChange={(e) => handleChange('ResumePublications', 'publication.title', e.target.value)}
            />

            <label>Publisher</label>
            <input
                type="text"
                name="publication.publisher"
                value={data.publication.publisher}
                placeholder="Publisher"
                onChange={(e) => handleChange('ResumePublications', 'publication.publisher', e.target.value)}
            />

            <label>Date</label>
            <input
                type="text"
                name="publication.date"
                value={data.publication.date}
                placeholder="Date"
                onChange={(e) => handleChange('ResumePublications', 'publication.date', e.target.value)}
            />

            <label>Link</label>
            <input
                type="text"
                name="publication.link"
                value={data.publication.link}
                placeholder="Link"
                onChange={(e) => handleChange('ResumePublications', 'publication.link', e.target.value)}
            />

            <label>Tags</label>
            <input
                type="text"
                name="publication.tags"
                value={data.publication.tags.join(', ')} // Join array elements into a string
                placeholder="Tags (comma-separated)"
                onChange={(e) => handleChange('ResumePublications', 'publication.tags', e.target.value.split(', '))}
            />
        </div>
    );
}

export default ResumePublications;
