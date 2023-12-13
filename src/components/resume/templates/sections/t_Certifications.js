import React from 'react';
import { Container, Segment } from 'semantic-ui-react';

const CertificationsSection = ({ certifications }) => {
  if (!certifications || !certifications.certification || !Array.isArray(certifications.certification)) {
    return <div className="certifications-section">No certification data available.</div>;
  }

  return (
        <Segment>

    <div className="certifications-section">
      <div className="certifications-heading"><h2>{certifications.sectionHeading}</h2></div>
      {certifications.certification.map((cert, index) => (
        <div key={index} className="certification-item">
          <div className="certification-name"><h3>{cert.name}</h3></div>
          <div className="certification-organization"><h4>{cert.organization}</h4></div>
          <div className="certification-date"><h6>{`Date: ${cert.date}`}</h6></div>
        </div>
      ))}
    </div>
        </Segment>

  );
}

export default CertificationsSection;
