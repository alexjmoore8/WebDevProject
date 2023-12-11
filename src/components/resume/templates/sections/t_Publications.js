import React from 'react';

const PublicationsSection = ({ publications }) => {
  if (!publications || !publications.publication || !Array.isArray(publications.publication)) {
    return <div>No publication data available.</div>;
  }

  return (
    <div>
      <div>{publications.sectionHeading}</div>
      {publications.publication.map((publication, index) => (
        <div key={index}>
          <div>{publication.title}</div>
          <div>{publication.publisher}</div>
          <div>{`Date: ${publication.date}`}</div>
          <div>
            <a href={publication.link} target="_blank" rel="noopener noreferrer">
              {publication.link}
            </a>
          </div>
          <div>{`Tags: ${publication.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default PublicationsSection;
