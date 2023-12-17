import React, { useState, useEffect } from 'react';

function ResumeDropdown() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState('');

  useEffect(() => {
    fetch('/my-resumes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log('response.json', response.json);
        return response.json();
      })
      .then((data) => {
        const resumeTitles = data.map((resume) => resume.title);
        setResumes(resumeTitles);
      })
      .catch((error) => {
        console.error('Error fetching user\'s resumes:', error);
      });
  }, []);

  const handleDropdownChange = (event) => {
    setSelectedResume(event.target.value);
  };

  return (
    <div>
      <label htmlFor="resumeDropdown">Select a Resume:</label>
      <select id="resumeDropdown" value={selectedResume} onChange={handleDropdownChange}>
        <option value="">Select a Resume</option>
        {resumes.map((resumeTitle, index) => (
          <option key={index} value={resumeTitle}>
            {resumeTitle}
          </option>
        ))}
      </select>
      {selectedResume && <p>You selected: {selectedResume}</p>}
    </div>
  );
}

export default ResumeDropdown;
