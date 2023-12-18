import React from 'react';

export function CheckboxSection({ name, checked, onChange, required, disabled }) {
  return (
    <label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      {name}
    </label>
  );
}
