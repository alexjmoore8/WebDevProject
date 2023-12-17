import React from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import FormSectionHeader from './sectionComponents/SectionHeader.js'; 

function ResumeAbout({ data, handleChange }) {
  return (
    <div>
      <FormSectionHeader sectionName="About" data={data} handleChange={handleChange} />
      <label>Summary</label>
      <textarea
        name="summary"
        value={data.summary}
        placeholder="Write a brief summary about yourself"
        onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
      />
      <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}

export default ResumeAbout;
