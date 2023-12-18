import React, { useState } from 'react';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import FormSectionHeader from './sectionComponents/SectionHeader.js'; 
import NameOrgInput from './sectionComponents/NameAndOrg.js';
import DatePicker from './sectionComponents/datePicker.js';
import TagsInput from './sectionComponents/tags.js';
import ListManager from './sectionComponents/ListManager.js';
import "../css/list.css"


function ResumeCertifications({ data, handleChange, handleNext }) {
  const initialCertifications = Array.isArray(data.certifications)
    ? data.certifications.map(cert => ({
        ...cert,
        dateMonth: cert.dateMonth || '',
        dateYear: cert.dateYear || '',
      }))
    : [{}];

  const [certifications, setCertifications] = useState(initialCertifications);
  const [errors, setErrors] = useState({});

  const validateField = (index, field, value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return 'This field is required';
    }
    return '';
  };

  const handleInputChange = (index, field, value) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][field] = value;
    setCertifications(updatedCertifications);

    const error = validateField(index, field, value);
    setErrors({ ...errors, [`${index}-${field}`]: error });
  };

  const handleAddCertification = () => {
    if (certifications.length < 15) {
      setCertifications([...certifications, {}]);
    }
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

  return (
    <div>
      <FormSectionHeader sectionName="Certifications" data={data} handleChange={handleChange} />
      {certifications.map((certification, index) => (
        <div key={index}>
          <NameOrgInput
            index={index}
            data={certification}
            handleChange={handleInputChange}
            label="Certification"
          />
          <DatePicker
            dateValue={{
              year: certification.dateYear,
              month: certification.dateMonth,
            }}
            onChange={(value) => {
              handleInputChange(index, 'dateYear', value.year);
              handleInputChange(index, 'dateMonth', value.month);
            }}
          />

           <TagsInput
            value={certification.tags || []}
            onChange={(tagsArray) => handleInputChange(index, 'tags', tagsArray)}
            label="Certification"
          />

          <button className="list-button" onClick={() => handleRemoveCertification(index)}>Remove</button>
        </div>
      ))}

      {certifications.length < 15 && (
        <button className="list-button" onClick={handleAddCertification}>Add</button>
      )}      
        <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumeCertifications;
