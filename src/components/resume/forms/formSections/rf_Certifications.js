import React, { useState } from 'react';

function ResumeCertifications({ data, handleChange }) {
  const [certifications, setCertifications] = useState(data.certifications || [{}]);

  const handleAddCertification = () => {
    if (certifications.length < 10) {
      setCertifications([...certifications, {}]);
    }
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  const handleInputChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);
  };

  return (
    <div>
      <h2>Certifications</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeCertifications', e.target.name, e.target.value)}
      />

      {certifications.map((certification, index) => (
        <div key={index}>
          <label>Certification Name</label>
          <input
            type="text"
            name={`certifications[${index}].name`}
            value={certification.name || ''}
            placeholder="Certification Name"
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />

          <label>Organization</label>
          <input
            type="text"
            name={`certifications[${index}].organization`}
            value={certification.organization || ''}
            placeholder="Organization"
            onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
          />

          <label>Date</label>
          <input
            type="text"
            name={`certifications[${index}].date`}
            value={certification.date || ''}
            placeholder="Date"
            onChange={(e) => handleInputChange(index, 'date', e.target.value)}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`certifications[${index}].tags`}
            value={certification.tags ? certification.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => {
              const tagsArray = e.target.value.split(', ').filter((tag) => tag.trim() !== '');
              handleInputChange(index, 'tags', tagsArray);
            }}
          />

          <button onClick={() => handleRemoveCertification(index)}>Remove</button>
        </div>
      ))}

      {certifications.length < 10 && (
        <button onClick={handleAddCertification}>Add Certification</button>
      )}
    </div>
  );
}

export default ResumeCertifications;
