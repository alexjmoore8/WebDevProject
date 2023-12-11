import React from 'react';
import SocialsSection from './t_Socials.js';

const ContactSection = ({ contact, socialsData }) => {
  const renderContact = () => {
    const { location, phone, email } = contact;

    return (
      <div>
        <div>{`${location.city}, ${location.state}`}</div>
        <div>{phone}</div>
        <div>{email}</div>
      </div>
    );
  };

  const renderSocials = () => {
    if (!socialsData || !socialsData.profile || !Array.isArray(socialsData.profile)) {
      return null;
    }

    return (
      <div>
        {socialsData.profile.map((profile, index) => (
          <div key={index}>{`${profile.name}: ${profile.link}`}</div>
        ))}
      </div>
    );
  };


  return (
    <div>
      {renderContact()}
      {renderSocials()}
    </div>
  );
};

export default ContactSection;

