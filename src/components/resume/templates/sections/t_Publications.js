import React from 'react';
import { processItems } from '../../../../helper/ComparisonFunctions.js';

const PublicationsSection = ({ publications }) => {
  if (!publications || !publications.publication || !Array.isArray(publications.publication)) {
    return <div className="publications-section">No publication data available.</div>;
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

  const sortedPublications = processItems(publications.publication, jobTags, 'title');
  const limitedPublications = sortedPublications.slice(0, 5);

  return (
    <div className="publications-section">
      <div className="publications-heading"><h2>{publications.sectionHeading}</h2></div>
      {limitedPublications.map((publication, index) => (
        <div key={index} className="publication-item">
          <div className="publication-title"><h3>{publication.title}</h3></div>
          <div className="publication-publisher"><h4>{publication.publisher}</h4></div>
          <div className="publication-link">
            <a href={publication.link} target="_blank" rel="">
              {publication.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicationsSection;
