import React, { useState } from 'react';
import StateDropdown from './sectionComponents/state.js';
import MonthDropdown from './sectionComponents/month.js';
import YearDropdown from './sectionComponents/year.js';

function ResumeExperience({ data, handleChange }) {
  const initialExperience = data.experience || [{}];
  const [experience, setExperience] = useState(initialExperience);
  const [selectedState, setSelectedState] = useState('');
  const [grammarSuggestions, setGrammarSuggestions] = useState([]);
  const [spellingSuggestions, setSpellingSuggestions] = useState({});

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleAddExperience = () => {
    if (experience.length < 10) {
      setExperience([
        ...experience,
        { location: { selectedState: '' } }
      ]);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleInputChange = (index, field, value) => {
    const updatedExperience = [...experience];
    if (!updatedExperience[index].location) {
      updatedExperience[index].location = {}; 
    }
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);

    // Clear previous suggestions for this field
    setSpellingSuggestions({
      ...spellingSuggestions,
      [field]: [],
    });
  };

  const checkGrammarAndSpelling = async (text) => {
    try {
      const response = await fetch('https://api.languagetool.org/v2/check', {
        method: 'POST',
        body: JSON.stringify({
          text: text,
          language: 'en-US',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`LanguageTool API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const grammarMatches = data.matches.filter(match => match.type === 'grammar');
      const spellingMatches = data.matches.filter(match => match.type === 'spelling');

      return { grammarMatches, spellingMatches };
    } catch (error) {
      console.error(error);
      return { grammarMatches: [], spellingMatches: [] };
    }
  };

  const handleGrammarAndSpellingCheck = async () => {
    try {
      let textToCheck = experience
        .map((data) => `${data.position || ''} ${data.organization || ''}`)
        .join('. ');

      const { grammarMatches, spellingMatches } = await checkGrammarAndSpelling(textToCheck);
      setGrammarSuggestions(grammarMatches);

      const spellingSuggestions = {};
      spellingMatches.forEach((match) => {
        const field = match.context.offset;
        const suggestions = match.replacements.map((rep) => rep.value);
        spellingSuggestions[field] = suggestions;
      });
      setSpellingSuggestions(spellingSuggestions);
    } catch (error) {
      console.error('Error checking grammar and spelling:', error);
    }
  };

  return (
  
    <div>
      <h2>Experience</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeExperience', e.target.name, e.target.value)}
      />

      {experience.map((data, index) => (
        <div key={index}>
          <label>Job Title</label>
          <input
            type="text"
            name={`experience[${index}].position`}
            value={data.position || ''}
            placeholder="Job position"
            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
          />
          {spellingSuggestions[`experience[${index}].position`] && (
            <ul>
              {spellingSuggestions[`experience[${index}].position`].map((suggestion, sIndex) => (
                <li key={sIndex}>{suggestion}</li>
              ))}
            </ul>
          )}

          <label>Company</label>
          <input
            type="text"
            name={`experience[${index}].organization`}
            value={data.organization || ''}
            placeholder="Company"
            onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
          />
          {spellingSuggestions[`experience[${index}].organization`] && (
            <ul>
              {spellingSuggestions[`experience[${index}].organization`].map((suggestion, sIndex) => (
                <li key={sIndex}>{suggestion}</li>
              ))}
            </ul>
          )}

         <label>City</label>
          <input
            type="text"
            name={`experience[${index}].city`}
            value={data.city || ''}
            placeholder="city"
            onChange={(e) => handleInputChange(index, 'city', e.target.value)}
          />
          {spellingSuggestions[`experience[${index}].city`] && (
            <ul>
              {spellingSuggestions[`experience[${index}].city`].map((suggestion, sIndex) => (
                <li key={sIndex}>{suggestion}</li>
              ))}
            </ul>
          )}
          <label>State</label>
          <div>
              <StateDropdown value={selectedState} onChange={handleStateChange} />
          </div>

          <div>
            <MonthDropdown
              value={data.startDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'startDateMonth', e.target.value)}
            />
            <YearDropdown
              value={data.startDateYear || ''}
              onChange={(e) => handleInputChange(index, 'startDateYear', e.target.value)}
            />
          </div>

          <label>End Date</label>
          <div>
            <MonthDropdown
              value={data.endDateMonth || ''}
              onChange={(e) => handleInputChange(index, 'endDateMonth', e.target.value)}
            />
            <YearDropdown
              value={data.endDateYear || ''}
              onChange={(e) => handleInputChange(index, 'endDateYear', e.target.value)}
            />
          </div>

          <label>Bullets</label>
          <textarea
            name={`experience[${index}].bullets`}
            value={data.bullets ? data.bullets.join('\n') : ''}
            placeholder="Job Bullets (one per line)"
            onChange={(e) => handleInputChange(index, 'bullets', e.target.value.split('\n'))}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`experience[${index}].tags`}
            value={data.tags ? data.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => handleInputChange(index, 'tags', e.target.value.split(', '))}
          />

            {experience.length > 1 && (
            <button onClick={() => handleRemoveExperience(index)}>Remove</button>
          )}
        </div>
      ))}

      {experience.length < 10 && (
        <button onClick={handleAddExperience}>Add Experience</button>
      )}

      <button onClick={handleGrammarAndSpellingCheck}>Check Grammar</button>

      {grammarSuggestions.length > 0 && (
        <div>
          <h3>Grammar Suggestions</h3>
          <ul>
            {grammarSuggestions.map((suggestion, index) => (
              <li key={index}>
                {suggestion.message} - Found: "{suggestion.context.text}"
                {suggestion.replacements.length > 0 &&
                  ` Suggestion: "${suggestion.replacements.map((rep) => rep.value).join(', ')}"`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeExperience;
