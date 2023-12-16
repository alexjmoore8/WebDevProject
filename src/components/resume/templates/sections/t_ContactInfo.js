import React from 'react';
import { Container } from 'semantic-ui-react';

const ContactInfoSection = ({ contact, socialsData }) => {
  const { location, phone, email } = contact;
  const profiles = socialsData?.profile || [];

  const uniqueNames = {};
  const filteredSocials = profiles.filter((profile, index) => {
    if (!uniqueNames[profile.name]) {
      uniqueNames[profile.name] = true;
      return true;
    }
    return false;
  });

  // TODO add tag comparison
  const limitedSocials = filteredSocials.slice(0, 3);

  return (
    <div className="contact-section">
      <div className="contact-line">{`${location.city}, ${location.state}`} | {phone} | {email}</div>
      {limitedSocials.map((profile, index) => (
        <span key={index}>
          <a href={profile.link} target="_blank" rel="">
            {profile.name}
          </a>
          {index !== limitedSocials.length - 1 && ' | '}
        </span>
      ))}
    </div>
  );
};

export default ContactInfoSection;
