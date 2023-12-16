import React from 'react';

const PublicationsSection = ({ publications }) => {
  if (!publications || !publications.publication || !Array.isArray(publications.publication)) {
    return <div className="publications-section">No publication data available.</div>;
  }

  const uniqueNames = {};
  const filteredPublications = publications.publication.filter((publication, index) => {
    if (!uniqueNames[publication.title]) {
        uniqueNames[publication.title] = true;
        return true;
      }
      return false;
    });

  // TODO add tag comparison
  const limitedPublications = filteredPublications.slice(0, 5);

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
