import React, { useState } from 'react';
import Typo from 'typo-js';
import StateDropdown from './sectionComponents/state.js';
import DegreeDropdown from './sectionComponents/degree.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeEducation({ data, handleChange }) {
  const [educations, setEducations] = useState(data.educations || [{}]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [errors, setErrors] = useState({});
  const dictionary = new Typo('en_US');

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

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

    const updatedErrors = { ...errors };
    delete updatedErrors[`educations[${index}].${field}`];
    setErrors(updatedErrors);
  };

  const validateForm = () => {
    const errors = {};

    educations.forEach((education, index) => {
      if (!education.institution || !isSpellingValid(education.institution)) {
        errors[`educations[${index}].institution`] = 'Institution is required or contains misspelled words';
      }
      if (!education.location || !education.location.city || !isSpellingValid(education.location.city)) {
        errors[`educations[${index}].location.city`] = 'City is required or contains misspelled words';
      }
      if (!selectedState) {
        errors[`educations[${index}].location.state`] = 'State is required';
      }
      if (!selectedDegree) {
        errors[`educations[${index}].degree`] = 'Degree is required';
      }
      if (!education.major || !isSpellingValid(education.major)) {
        errors[`educations[${index}].major`] = 'Major is required or contains misspelled words';
      }
      if (!education.startDateMonth || !education.startDateYear) {
        errors[`educations[${index}].start_date`] = 'Start Date is required';
      }
      if (!education.endDateMonth || !education.endDateYear) {
        errors[`educations[${index}].end_date`] = 'End Date is required';
      }
      if (!education.gpa) {
        errors[`educations[${index}].gpa`] = 'GPA is required';
      }
    });

    return errors;
  };

  const isSpellingValid = (text) => {
    return dictionary.check(text);
  };

  const handleSubmit = () => {
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      console.log('Form submitted:', educations);
    } else {
      console.error('Form has errors:', errors);
      setErrors(errors);
    }
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
          {errors[`educations[${index}].institution`] && (
            <div className="error">{errors[`educations[${index}].institution`]}</div>
          )}

          <label>City</label>
          <input
            type="text"
            name={`educations[${index}].location.city`}
            value={education.location ? education.location.city || '' : ''}
            placeholder="City"
            onChange={(e) => handleInputChange(index, 'location.city', e.target.value)}
          />
          {errors[`educations[${index}].location.city`] && (
            <div className="error">{errors[`educations[${index}].location.city`]}</div>
          )}

          <label>State</label>
          <div>
            <StateDropdown value={selectedState} onChange={handleStateChange} />
            {errors[`educations[${index}].location.state`] && (
              <div className="error">{errors[`educations[${index}].location.state`]}</div>
            )}
          </div>

          <label>Degree</label>
          <div>
            <DegreeDropdown value={selectedDegree} onChange={handleDegreeChange} />
            {errors[`educations[${index}].degree`] && (
              <div className="error">{errors[`educations[${index}].degree`]}</div>
            )}
          </div>

          <label>Major</label>
          <input
            type="text"
            name={`educations[${index}].major`}
            value={education.major || ''}
            placeholder="Major"
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />
          {errors[`educations[${index}].major`] && (
            <div className="error">{errors[`educations[${index}].major`]}</div>
          )}

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
            {errors[`educations[${index}].start_date`] && (
              <div className="error">{errors[`educations[${index}].start_date`]}</div>
            )}
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
            {errors[`educations[${index}].end_date`] && (
              <div className="error">{errors[`educations[${index}].end_date`]}</div>
            )}
          </div>

          <label>GPA</label>
          <input
            type="text"
            name={`educations[${index}].gpa`}
            value={education.gpa || ''}
            placeholder="GPA"
            onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
          />
          {errors[`educations[${index}].gpa`] && (
            <div className="error">{errors[`educations[${index}].gpa`]}</div>
          )}

          <button onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}

      {educations.length < 5 && (
        <button onClick={handleAddEducation}>Add Education</button>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ResumeEducation;
