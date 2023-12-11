import React from 'react';

const CertificationsSection = ({ certifications }) => {
  if (!certifications || !certifications.certification || !Array.isArray(certifications.certification)) {
    return <div>No certification data available.</div>;
  }

  return (
    <div>
      <div><h2>{certifications.sectionHeading}</h2></div>
      {certifications.certification.map((cert, index) => (
        <div key={index}>
          <div>{cert.name}</div>
          <div>{cert.organization}</div>
          <div>{`Date: ${cert.date}`}</div>
          <div>{`Tags: ${cert.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default CertificationsSection;
