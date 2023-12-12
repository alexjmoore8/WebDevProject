import React, { useState } from 'react';

function ResumePublications({ data, handleChange }) {
  const [publications, setPublications] = useState(data.publications || [{}]);

  const handleAddPublication = () => {
    if (publications.length < 15) {
      setPublications([...publications, {}]);
    }
  };

  const handleRemovePublication = (index) => {
    const updatedPublications = [...publications];
    updatedPublications.splice(index, 1);
    setPublications(updatedPublications);
  };

  const handleInputChange = (index, field, value) => {
    const updatedPublications = [...publications];
    updatedPublications[index][field] = value;
    setPublications(updatedPublications);
  };

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

      {publications.map((publication, index) => (
        <div key={index}>
          <label>Publication Title</label>
          <input
            type="text"
            name={`publications[${index}].title`}
            value={publication.title || ''}
            placeholder="Publication Title"
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />

          <label>Publisher</label>
          <input
            type="text"
            name={`publications[${index}].publisher`}
            value={publication.publisher || ''}
            placeholder="Publisher"
            onChange={(e) => handleInputChange(index, 'publisher', e.target.value)}
          />

          <label>Date</label>
          <input
            type="text"
            name={`publications[${index}].date`}
            value={publication.date || ''}
            placeholder="Date"
            onChange={(e) => handleInputChange(index, 'date', e.target.value)}
          />

          <label>Link</label>
          <input
            type="text"
            name={`publications[${index}].link`}
            value={publication.link || ''}
            placeholder="Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`publications[${index}].tags`}
            value={publication.tags ? publication.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => {
              const tagsArray = e.target.value.split(', ').filter((tag) => tag.trim() !== '');
              handleInputChange(index, 'tags', tagsArray);
            }}
          />

          <button onClick={() => handleRemovePublication(index)}>Remove</button>
        </div>
      ))}

      {publications.length < 15 && (
        <button onClick={handleAddPublication}>Add Publication</button>
      )}
    </div>
  );
}

export default ResumePublications;