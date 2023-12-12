import React from 'react';

const SocialsSection = ({ data }) => {
  return (
    <div className="socials-section">
      <h2 className="socials-name">{data.name}</h2>
      <a href={data.link} target="_blank" rel="r" className="socials-link">
        {data.link}
      </a>
      <h4 className="socials-platform">{data.platformType}</h4>
    </div>
  );
}

export default SocialsSection;