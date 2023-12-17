import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import "../css/results.css"

function ResumePublications({ data, handleChange }) {
  const [publications, setPublications] = useState(data.publications || [{}]);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

  const handleAddPublication = () => {
    if (publications.length < 20) {
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

  const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Publications' : 'Publications';
  };

  return (
    <div>
      <h2>Publications</h2>
      <label>
        <input
          type="checkbox"
          name="includeCustomTitle"
          checked={includeCustomTitle}
          onChange={(e) => setIncludeCustomTitle(e.target.checked)}
        />
        Include Custom Section Title
      </label>

      <input
        type="text"
        name="sectionHeading"
        value={getDefaultSectionTitle()}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumePublications', e.target.name, e.target.value)}
        disabled={!includeCustomTitle}
      />

      {publications.map((publication, index) => (
        <div key={index}>
          <input
            type="text"
            name={`publications[${index}].title`}
            value={publication.title || ''}
            placeholder="Publication Title"
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].publisher`}
            value={publication.publisher || ''}
            placeholder="Publisher"
            onChange={(e) => handleInputChange(index, 'publisher', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].date`}
            value={publication.date || ''}
            placeholder="Date"
            onChange={(e) => handleInputChange(index, 'date', e.target.value)}
          />

          <input
            type="text"
            name={`publications[${index}].link`}
            value={publication.link || ''}
            placeholder="Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />

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

      {publications.length < 20 && (
        <button onClick={handleAddPublication}>Add Publication</button>
      )}
     <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumePublications;
