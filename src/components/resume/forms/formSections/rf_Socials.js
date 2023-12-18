import React, { useState, useEffect } from 'react';
import ListManager from './sectionComponents/ListManager.js';

function ResumeSocialMedia({ data, handleChange }) {
  const [socialMediaData, setSocialMediaData] = useState(data);
  const [profiles, setProfiles] = useState(data.profiles || [{ name: '', link: '', platformType: '' }]);
  
  useEffect(() => {
    setSocialMediaData(data);
  }, [data]);

  const handleInputChange = (field, value) => {
    const updatedData = { ...socialMediaData, [field]: value };
    setSocialMediaData(updatedData);
    handleChange(updatedData);
  };

  const handleItemChange = (newItems) => {
    setProfiles(newItems);
  };

  const renderFields = (item, index) => (
    <>
      <label>Display Name or Link</label>
      <input
        type="text"
        value={item.name}
        onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
      />

      <label>Link</label>
      <input
        type="text"
        value={item.link}
        onChange={(e) => handleFieldChange(index, 'link', e.target.value)}
      />

      <label>Type</label>
      <input
        type="text"
        value={item.platformType}
        onChange={(e) => handleFieldChange(index, 'platformType', e.target.value)}
      />
    </>
  );

  const handleFieldChange = (index, field, value) => {
    const updatedProfiles = [...profiles];
    updatedProfiles[index][field] = value;
    handleItemChange(updatedProfiles);
  };

  return (
    <ListManager
      items={profiles}
      onItemChange={handleItemChange}
      itemType="Social Media Profile"
      limit={3}
      renderFields={renderFields}
    />
  );
}

export default ResumeSocialMedia;
