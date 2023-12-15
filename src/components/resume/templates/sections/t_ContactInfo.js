import React from 'react';
import { Container } from 'semantic-ui-react';

const ContactInfoSection = ({ contact, socialsData }) => {
  const { location, phone, email } = contact;
  const profiles = socialsData?.profile || [];

  return (
    <div className="contact-section">
      <div className="contact-line">{`${location.city}, ${location.state}`} | {phone} | {email}</div>
      {profiles.map((profile, index) => (
        <span key={index}>
          <a href={profile.link} target="_blank" rel="">
            {profile.name}
          </a>
          {index !== profiles.length - 1 && ' | '}
        </span>
      ))}
    </div>
  );
};

export default ContactInfoSection;
