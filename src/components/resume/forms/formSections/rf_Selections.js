import React from "react";
import Typo from 'typo-js';

function ResumeSelections({ data, handleChange, handleSectionChange }) {
  const dictionary = new Typo('en_US');

  const handleCheckboxChange = (name) => {
    handleChange('ResumeSelections', name, !data[name]);
  };

  const isTitleValid = (title) => title.trim() !== '';
  const isSpellingValid = (text) => dictionary.check(text);

  return (
    <div>
      <h2>Resume Selections</h2>

      <label>Resume Title:</label>
      <input
        type="text"
        name="resumeTitle"
        value={data.resumeTitle}
        onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
      />
      {!isTitleValid(data.resumeTitle) && (
        <div className="error-message">Invalid input. Please check your data.</div>
      )}
      {!isSpellingValid(data.resumeTitle) && (
        <div className="error-message">Spelling error in the resume title.</div>
      )}

      <label>Layout:</label>
      <select
        name="layout"
        value={data.layout}
        onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
      >
        <option value="layout1">Layout 1</option>
        <option value="layout2">Layout 2</option>
        <option value="layout3">Layout 3</option>
      </select>

      <label>Style:</label>
      <select
        name="style"
        value={data.style}
        onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
      >
        <option value="style1">Style 1</option>
        <option value="style2">Style 2</option>
        <option value="style3">Style 3</option>
      </select>

      <label>Sections:</label>
      <div>
        <label>
          <input
            type="checkbox"
            name="contact"
            checked={data.contact}
            onChange={() => handleCheckboxChange('contact')}
          />
          Contact Info
        </label>

        <label>
          <input
            type="checkbox"
            name="socials"
            checked={data.socials}
            onChange={() => handleCheckboxChange('socials')}
          />
          Social Media & Website
        </label>

        <label>
          <input
            type="checkbox"
            name="about"
            checked={data.about}
            onChange={() => handleCheckboxChange('about')}
          />
          About
        </label>

        <label>
          <input
            type="checkbox"
            name="education"
            checked={data.education}
            onChange={() => handleCheckboxChange('education')}
          />
          Education
        </label>

        <label>
          <input
            type="checkbox"
            name="courses"
            checked={data.courses}
            onChange={() => handleCheckboxChange('courses')}
          />
          Courses
        </label>

        <label>
          <input
            type="checkbox"
            name="certifications"
            checked={data.certifications}
            onChange={() => handleCheckboxChange('certifications')}
          />
          Certifications
        </label>

        <label>
          <input
            type="checkbox"
            name="publications"
            checked={data.publications}
            onChange={() => handleCheckboxChange('publications')}
          />
          Publications
        </label>

        <label>
          <input
            type="checkbox"
            name="languages"
            checked={data.languages}
            onChange={() => handleCheckboxChange('languages')}
          />
          Languages
        </label>

        <label>
          <input
            type="checkbox"
            name="projects"
            checked={data.projects}
            onChange={() => handleCheckboxChange('projects')}
          />
          Projects
        </label>

        <label>
          <input
            type="checkbox"
            name="experience"
            checked={data.experience}
            onChange={() => handleCheckboxChange('experience')}
          />
          Experience
        </label>

        <label>
          <input
            type="checkbox"
            name="skills"
            checked={data.skills}
            onChange={() => handleCheckboxChange('skills')}
          />
          Skills
        </label>
      </div>
    </div>
  );
}

export default ResumeSelections;
