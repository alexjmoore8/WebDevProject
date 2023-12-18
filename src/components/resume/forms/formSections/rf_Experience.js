import React, { useState } from 'react';
import FormSectionHeader from './sectionComponents/SectionHeader.js';
import NameOrgInput from './sectionComponents/NameAndOrg.js';
import CityStateInput from './sectionComponents/cityState.js';
import DatePicker from './sectionComponents/datePicker.js';
import TagsInput from './sectionComponents/tags.js';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import ListManager from './sectionComponents/ListManager.js';
import "../css/results.css"

function ResumeExperience({ data, handleChange }) {
  const [experience, setExperience] = useState(data.experience || [{}]);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

  const handleAddExperience = () => {
    if (experience.length < 20) {
      setExperience([
        ...experience,
        { location: { selectedState: '' } }
      ]);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setExperience(updatedExperience);
  };


  return (
    <div>
      <FormSectionHeader sectionName="Experience" data={data} handleChange={handleChange} />

      {experience.map((exp, index) => (
        <div key={index}>
          <NameOrgInput
            index={index}
            data={exp}
            handleChange={handleInputChange}
            label="Experience"
          />

          <CityStateInput
            index={index}
            data={exp.location}
            handleChange={handleInputChange}
          />

          <DatePicker
            dateValue={{
              year: exp.startDateYear,
              month: exp.startDateMonth,
            }}
            onChange={(value) => {
              handleInputChange(index, 'startDateYear', value.year);
              handleInputChange(index, 'startDateMonth', value.month);
            }}
            />
         
          <textarea value={exp.bullets} placeholder="Job Bullets (one per line)" onChange={(e) => handleInputChange(index, 'bullets', e.target.value)} />
            <TagsInput
            value={exp.tags || []}
            onChange={(tagsArray) => handleInputChange(index, 'tags', tagsArray)}
            label="Experience"
          />

          {experience.length > 1 && (
            <button className="list-button" onClick={() => handleRemoveExperience(index)}>Remove</button>
          )}
        </div>
      ))}

      {experience.length < 20 && (
        <button className="list-button"  onClick={handleAddExperience}>Add</button>
      )}
      <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumeExperience;
