import React, { useState } from 'react';
import PlatformDropdown from './sectionComponents/platform.js';

function ResumeSocialMedia({ data, handleChange }) {
  const [profiles, setProfiles] = useState(data.profiles || [{ name: '', link: '', platformType: '' }]);

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

          <label>Link</label>
          <input
            type="text"
            name="link"
            value={profile.link}
            placeholder="Profile Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />

          <label>Type</label>
          <div>
            <PlatformDropdown
              value={profile.platformType}
              handleChange={(e) => handleInputChange(index, 'platformType', e.target.value)}
            />
          </div>
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
