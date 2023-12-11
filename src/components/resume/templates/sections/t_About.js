import React from 'react';

const AboutSection = ({ about }) => {
  if (!about || !about.summary) {
    return <div>No about me data available.</div>;
  }

  const { sectionHeading, summary } = about;

  return (
    <div>
      <div>{sectionHeading}</div>
      <div>{summary}</div>
    </div>
  );
}

export default AboutSection;
