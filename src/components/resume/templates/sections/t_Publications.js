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
          <div className="publication-title">{publication.title}</div>
          <div className="publication-publisher">{publication.publisher}</div>
          <div className="publication-date">{`Date: ${publication.date}`}</div>
          <div className="publication-link">
            <a href={publication.link} target="_blank" rel="">
              {publication.link}
            </a>
          </div>
          <div className="publication-tags">{`Tags: ${publication.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default PublicationsSection;
