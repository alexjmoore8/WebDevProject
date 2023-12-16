import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import { processItems } from '../../../../helper/ComparisonFunctions.js';


const CertificationsSection = ({ certifications }) => {
  if (!certifications || !certifications.certification || !Array.isArray(certifications.certification)) {
    return <div className="certifications-section">No certification data available.</div>;
  }

  const jobTags = [
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'otherStuff', 
    'stuff',
    'things'
  ];

  const sortedCertifications = processItems(certifications.certification, jobTags, 'name');

  const limitedCertifications = sortedCertifications.slice(0, 5);

  return (
        <Segment>

    <div className="certifications-section">
      <div className="certifications-heading"><h2>{certifications.sectionHeading}</h2></div>
        {limitedCertifications.map((cert, index) => (
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
