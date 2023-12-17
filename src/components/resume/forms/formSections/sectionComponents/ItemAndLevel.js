import React from 'react';

const ItemAndLevel = ({ item, handleInputChange, levels, nameLabel, levelLabel }) => {
  
    const levelValue = item.level || '';

  return (
    <div>
      <label>{nameLabel}</label>
      <input
        type="text"
        name={`items[${item.index}].name`}
        value={item.name || ''}
        placeholder={nameLabel}
        onChange={(e) => handleInputChange(item.index, 'name', e.target.value)}
      />

      <label>{levelLabel}</label>
      <select
        name={`items[${item.index}].level`}
        value={levelValue}
        onChange={(e) => handleInputChange(item.index, 'level', e.target.value)}
      >
        {levels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      {levelValue === 'Other' && (
        <input
          type="text"
          placeholder="Other Level"
          value={item.otherLevel || ''}
          onChange={(e) => handleInputChange(item.index, 'otherLevel', e.target.value)}
        />
      )}

    </div>
  );
};

export default ItemAndLevel;
