// PronounsDropdown.js
import React from 'react';

function PronounsDropdown({ value, onChange, customPronouns, onCustomPronounsChange }) {
    const pronounOptions = [
        'she/her/hers',
        'he/him/his',
        'they/them/theirs',
        'Other'
    ];

    const handlePronounsChange = (e) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);

        if (selectedValue !== 'Other') {
            onCustomPronounsChange('');
        }
    };

    return (
        <div>
            <label>Pronouns</label>
            <select
                name="pronouns"
                value={value}
                onChange={handlePronounsChange}
            >
                {pronounOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {value === 'Other' && (
                <div>
                    <label>Custom Pronouns</label>
                    <input
                        type="text"
                        name="customPronouns"
                        value={customPronouns}
                        placeholder="Enter custom pronouns"
                        onChange={(e) => onCustomPronounsChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
}

export default PronounsDropdown;
