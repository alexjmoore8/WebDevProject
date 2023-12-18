import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import FormSectionHeader from './sectionComponents/SectionHeader.js';
import TagsInput from './sectionComponents/tags.js';
import NameOrgInput from './sectionComponents/NameAndOrg.js';
import DatePicker from './sectionComponents/datePicker.js';
import ListManager from './sectionComponents/ListManager.js';
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

      <FormSectionHeader sectionName="Publications" data={data} handleChange={handleChange} />

      {publications.map((publication, index) => (
        <div key={index}>
          <NameOrgInput
            index={index}
            data={publication}
            handleChange={handleInputChange}
            label="Publication"
          />

          <DatePicker
            dateValue={{
              year: publication.publicationDateYear,
              month: publication.publicationDateMonth,
            }}
            onChange={(value) => {
              handleInputChange(index, 'publicationDateYear', value.year);
              handleInputChange(index, 'publicationDateMonth', value.month);
            }}
            label="Publication Date"
          />

          <input
            type="text"
            name={`publications[${index}].link`}
            value={publication.link || ''}
            placeholder="Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />

          <TagsInput
            value={publication.tags || []}
            onChange={(tagsArray) => handleInputChange(index, 'tags', tagsArray)}
            label="Publications"
          />

          <button className='list-button' onClick={() => handleRemovePublication(index)}>Remove</button>
        </div>
      ))}

      {publications.length < 20 && (
        <button className='list-button' onClick={handleAddPublication}>Add</button>
      )}
     <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumePublications;
