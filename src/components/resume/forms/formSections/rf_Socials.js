import React, { useState } from 'react';
import PlatformDropdown from './sectionComponents/platform.js';
import Typo from 'typo-js';

function ResumeSocialMedia({ data, handleChange }) {
  const [profiles, setProfiles] = useState(data.profiles || [{ name: '', link: '', platformType: '' }]);
  const dictionary = new Typo('en_US');

  const handleAddProfile = () => {
    if (profiles.length < 3) {
      setProfiles([...profiles, { name: '', link: '', platformType: '' }]);
    }
  };

  const handleRemoveProfile = (index) => {
    const updatedProfiles = [...profiles];
    updatedProfiles.splice(index, 1);
    setProfiles(updatedProfiles);
  };

  const handleInputChange = (index, field, value) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index][field] = value;
    setProfiles(updatedProfiles);
  };

  const isNameValid = (name) => name.trim() !== '';
  const isLinkValid = (link) => link.trim() !== '';
  const isPlatformTypeValid = (platformType) => platformType.trim() !== '';
  const isSpellingValid = (text) => dictionary.check(text);

  return (
    <div>
      <h2>Social Media Profiles</h2>
      {profiles.map((profile, index) => (
        <div key={index}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            placeholder="Name"
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          {!isNameValid(profile.name) && (
            <div className="error-message">Name is required.</div>
          )}
          {!isSpellingValid(profile.name) && (
            <div className="error-message">Spelling error in the name.</div>
          )}

          <label>Link</label>
          <input
            type="text"
            name="link"
            value={profile.link}
            placeholder="Profile Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />
          {!isLinkValid(profile.link) && (
            <div className="error-message">Link is required.</div>
          )}

          <label>Type</label>
          <div>
            <PlatformDropdown
              value={profile.platformType}
              handleChange={(e) => handleInputChange(index, 'platformType', e.target.value)}
            />
          </div>
          {!isPlatformTypeValid(profile.platformType) && (
            <div className="error-message">Platform Type is required.</div>
          )}

          <button onClick={() => handleRemoveProfile(index)}>Remove</button>
        </div>
      ))}

      {profiles.length < 3 && (
        <button onClick={handleAddProfile}>Add Profile</button>
      )}
    </div>
  );
}

export default ResumeSocialMedia;
