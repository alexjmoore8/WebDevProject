import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
const AboutSection = ({ about }) => {
  if (!about || !about.summary) {
    return <div className="about-section">No about me data available.</div>;
  }

  const { sectionHeading, summary } = about;

  return (
        <Segment>

    <div className="about-section">
      <div className="about-heading"><h2>{sectionHeading}</h2></div>
      <div className="about-summary"><p>{summary}</p></div>
    </div>
        </Segment>

  );
}

export default AboutSection;
