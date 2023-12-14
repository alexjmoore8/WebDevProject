import React, { useState } from 'react';

function ResumeAbout({ data, handleChange }) {
  const [formErrors, setFormErrors] = useState({
    sectionHeading: '',
    summary: '',
  });

  const validateForm = async () => {
    let isValid = true;
    const newErrors = {
      sectionHeading: '',
      summary: '',
    };

    if (data.sectionHeading.trim() === '') {
      newErrors.sectionHeading = 'Section Title is required';
      isValid = false;
    }

    if (data.summary.trim() === '') {
      newErrors.summary = 'Summary is required';
      isValid = false;
    } else {
      try {
        const grammarErrors = await checkGrammar(data.summary);
        if (grammarErrors.length > 0) {
          newErrors.summary = 'Summary contains grammar errors';
          isValid = false;
        }
      } catch (error) {
        console.error('Grammar check failed:', error);
        newErrors.summary = 'Failed to check grammar. Please try again later.';
        isValid = false;
      }
    }

    setFormErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await validateForm()) {
      alert('Form submitted successfully');
    } else {
      alert('Form has validation errors. Please correct them.');
    }
  };

  const checkGrammar = async (text) => {
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

      const data = await response.json();
      return data.matches;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };

  return (
    <div>
      <h2>About</h2>

      <form onSubmit={handleSubmit}>
        <label>Section Title</label>
        <input
          type="text"
          name="sectionHeading"
          value={data.sectionHeading}
          placeholder="Section title to display on resume"
          onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
        />
        <div className="error">{formErrors.sectionHeading}</div>

        <label>Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          placeholder="Write a brief summary about yourself"
          onChange={(e) => handleChange('ResumeAbout', e.target.name, e.target.value)}
        />
        <div className="error">{formErrors.summary}</div>

        <button type="submit" disabled={!validateForm()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default ResumeAbout;
