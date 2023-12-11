import React from 'react';

const PublicationsSection = ({ publications }) => {
  if (!publications || !publications.publication || !Array.isArray(publications.publication)) {
    return <div>No publication data available.</div>;
  }

  return (
    <div>
      <div><h2>{publications.sectionHeading}</h2></div>
      {publications.publication.map((publication, index) => (
        <div key={index}>
          <div>{publication.title}</div>
          <div>{publication.publisher}</div>
          <div>{`Date: ${publication.date}`}</div>
          <div>
            <a href={publication.link} target="_blank" rel="">
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
