import React from 'react';

const PublicationsSection = ({ publications }) => {
  if (!publications || !publications.publication || !Array.isArray(publications.publication)) {
    return <div className="publications-section">No publication data available.</div>;
  }

  return (
    <div className="publications-section">
      <div className="publications-heading"><h2>{publications.sectionHeading}</h2></div>
      {publications.publication.map((publication, index) => (
        <div key={index} className="publication-item">
          <div className="publication-title"><h3>{publication.title}</h3></div>
          <div className="publication-publisher"><h4>{publication.publisher}</h4></div>
          <div className="publication-date"><h6>{`Date: ${publication.date}`}</h6></div>
          <div className="publication-link">
            <a href={publication.link} target="_blank" rel="">
              {publication.link}
            </a>
          </div>
          <div className="tags">{`Tags: ${publication.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default PublicationsSection;
