import React from 'react';

const ContactInfoSection = ({ contact, socialsData }) => {
  const { location, phone, email } = contact;
  const profiles = socialsData?.profile || [];

  return (
    <div>
      <div>
        {`${location.city}, ${location.state}`} | {phone} | {email} |{' '}
        {profiles.map((profile, index) => (
          <span key={index}>
            <a href={profile.link} target="_blank" rel="">
              {profile.name}
            </a>
            {index !== profiles.length - 1 && ' | '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoSection;
