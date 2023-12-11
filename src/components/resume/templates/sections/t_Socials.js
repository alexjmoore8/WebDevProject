// SocialsSection.js
import React from 'react';

const SocialsSection = ({ data }) => {
  return (
    <div>
      <h2>{data.name}</h2>
      <a href={data.link} target="_blank" rel="">
        {data.link}
      </a>
      <h4>{data.platformType}</h4>
    </div>
  );
}

export default SocialsSection;
