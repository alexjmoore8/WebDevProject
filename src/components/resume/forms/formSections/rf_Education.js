import React, { useState } from 'react';
import DegreeDropdown from './sectionComponents/degree.js';
import FormSectionHeader from './sectionComponents/SectionHeader.js';
import CityStateInput from './sectionComponents/cityState.js';
import DatePicker from './sectionComponents/datePicker.js';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';

import "../css/form.css"

function ResumeEducation({ data, handleChange }) {
  const [educations, setEducations] = useState(data.educations || [{}]);
  const [selectedDegrees, setSelectedDegrees] = useState(Array(educations.length).fill(''));


  const handleDegreeChange = (e, index) => {
    const newSelectedDegrees = [...selectedDegrees];
    newSelectedDegrees[index] = e.target.value;
    setSelectedDegrees(newSelectedDegrees);
  };

  const handleAddEducation = () => {
    if (educations.length < 5) {
      setEducations([...educations, { location: {} }]);
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

const handleInputChange = (index, field, value) => {
    const updatedEducations = [...educations];
    if (field.includes('location.')) {
        const locationField = field.split('.')[1];
        updatedEducations[index].location = {
            ...updatedEducations[index].location,
            [locationField]: value
        };
    } else {
        updatedEducations[index][field] = value;
    }
    setEducations(updatedEducations);
};

  return (
    <div>
      <FormSectionHeader sectionName="Education" data={data} handleChange={handleChange} />

      {educations.map((education, index) => (
      <div key={index}>
          <input
            type="text"
            name={`educations[${index}].institution`}
            value={education.institution || ''}
            placeholder="School/Institution"
            onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
          />

          <CityStateInput/>

          <DegreeDropdown value={selectedDegrees[index]} onChange={(e) => handleDegreeChange(e, index)} />

          <input
            type="text"
            name={`educations[${index}].major`}
            value={education.major || ''}
            placeholder="Major"
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />

        <DatePicker
            dateValue={{
              year: education.dateYear,
              month: education.dateMonth,
            }}
            onChange={(value) => {
              handleInputChange(index, 'dateYear', value.year);
              handleInputChange(index, 'dateMonth', value.month);
            }}
          />


        <label>
          <input
            type="checkbox"
            name={`educations[${index}].includeGPA`}
            checked={education.includeGPA || false}
            onChange={(e) => handleInputChange(index, 'includeGPA', e.target.checked)}
          />
          Include GPA
        </label>

        {education.includeGPA && (
          <input
            type="text"
            name={`educations[${index}].gpa`}
            value={education.gpa || ''}
            placeholder="GPA"
            onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
          />
        )}
          <button onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}

      {educations.length < 5 && (
        <button onClick={handleAddEducation}>Add Education</button>
      )}
    <GrammarCheck data={data} handleChange={handleChange} />

    </div>
);
}

export default ResumeEducation;
