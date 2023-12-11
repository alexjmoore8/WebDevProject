import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import DegreeDropdown from './sectionComponents/degree.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeEducation({ data, handleChange }) {
  const [educations, setEducations] = useState(data.educations || [{}]);

  const [selectedState, setSelectedState] = useState('');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const [selectedDegree, setSelectedDegree] = useState('');

  const handleDegreeChange = (e) => {
    setSelectedDegree(e.target.value);
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
    if (!updatedEducations[index].location) {
      updatedEducations[index].location = {};
    }
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };


  return (
    <div>
      <h2>Education</h2>
      
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeEducation', e.target.name, e.target.value)}
      />

      {educations.map((education, index) => (
        <div key={index}>
          <label>School</label>
          <input
            type="text"
            name={`educations[${index}].institution`}
            value={education.institution || ''}
            placeholder="School/Institution"
            onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
          />

        <label>City</label>
        <input
          type="text"
          name={`educations[${index}].location.city`}
          value={education.location ? education.location.city || '' : ''}
          placeholder="City"
          onChange={(e) => handleInputChange(index, 'location.city', e.target.value)}
        />


        <label>State</label>
        <div>
            <StateDropdown value={selectedState} onChange={handleStateChange} />
        </div>

          <label>Degree</label>
          <div>
              <DegreeDropdown value={selectedDegree} onChange={handleDegreeChange} />
          </div>

          <label>Major</label>
          <input
            type="text"
            name={`educations[${index}].major`}
            value={education.major || ''}
            placeholder="Major"
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />

          <label>Start Date</label>
          <div>
            <MonthDropdown
              value={education.startDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)}
            />
            <YearDropdown
              value={education.startDateYear || ''}
              onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)}
            />
          </div>

          <label>End Date</label>
          <div>
            <MonthDropdown
              value={education.endDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)}
            />
            <YearDropdown
              value={education.endDateYear || ''}
              onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)}
            />
          </div>

          <label>GPA</label>
          <input
            type="text"
            name={`educations[${index}].gpa`}
            value={education.gpa || ''}
            placeholder="GPA"
            onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
          />
          <button onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}

      {educations.length < 5 && (
        <button onClick={handleAddEducation}>Add Education</button>
      )}
    </div>
  );
}

export default ResumeEducation;
