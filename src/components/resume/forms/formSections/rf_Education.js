import React, { useState } from 'react';

function ResumeEducation({ data, handleChange }) {
  const [educations, setEducations] = useState(data.educations || [{}]);

  const handleAddEducation = () => {
    if (educations.length < 5) {
      setEducations([...educations, {}]);
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEducations = [...educations];
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

          <label>Location</label>
          <input
            type="text"
            name={`educations[${index}].location`}
            value={education.location || ''}
            placeholder="Location"
            onChange={(e) => handleInputChange(index, 'location', e.target.value)}
          />

          <label>Degree</label>
          <input
            type="text"
            name={`educations[${index}].degree`}
            value={education.degree || ''}
            placeholder="Degree"
            onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
          />

          <label>Major</label>
          <input
            type="text"
            name={`educations[${index}].major`}
            value={education.major || ''}
            placeholder="Major"
            onChange={(e) => handleInputChange(index, 'major', e.target.value)}
          />

          <label>Start Date</label>
          <input
            type="text"
            name={`educations[${index}].startDate`}
            value={education.startDate || ''}
            placeholder="Start Date"
            onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
          />

          <label>End Date</label>
          <input
            type="text"
            name={`educations[${index}].endDate`}
            value={education.endDate || ''}
            placeholder="End Date"
            onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
          />

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
