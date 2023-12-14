import React, { useState } from 'react';
import Typo from 'typo-js';

function ResumeProjects({ data, handleChange }) {
  const initialProjects = data.projects || [{}];
  const [projects, setProjects] = useState(initialProjects);
  const dictionary = new Typo('en_US');

  const handleAddProject = () => {
    if (projects.length < 6) {
      setProjects([...projects, {}]);
    }
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleInputChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const isTitleValid = (title) => title.trim() !== '';
  const isDescriptionValid = (description) => description.trim() !== '';
  const isLinkValid = (link) => {
    return true;
  };
  const areTagsValid = (tags) => {
    const tagArray = tags.split(',').map((tag) => tag.trim());
    return tagArray.every((tag) => tag.length >= 3);
  };

  const isFormValid = (title, description, link, tags) => {
    return (
      isTitleValid(title) &&
      isDescriptionValid(description) &&
      isLinkValid(link) &&
      areTagsValid(tags)
    );
  };

  const isSpellingValid = (text) => {
    return dictionary.check(text);
  };

  return (
    <div>
      <h2>Projects</h2>
      <label>Section Title</label>
      <input
        type="text"
        name="sectionHeading"
        value={data.sectionHeading}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeProjects', e.target.name, e.target.value)}
      />

      {projects.map((project, index) => (
        <div key={index}>
          <label>Project Title</label>
          <input
            type="text"
            name={`projects[${index}].title`}
            value={project.title || ''}
            placeholder="Project Title"
            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
          />

          <label>Description</label>
          <textarea
            name={`projects[${index}].description`}
            value={project.description || ''}
            placeholder="Project Description"
            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
          />

          <label>Link</label>
          <input
            type="text"
            name={`projects[${index}].link`}
            value={project.link || ''}
            placeholder="Link"
            onChange={(e) => handleInputChange(index, 'link', e.target.value)}
          />

          <label>Tags</label>
          <input
            type="text"
            name={`projects[${index}].tags`}
            value={project.tags ? project.tags.join(', ') : ''}
            placeholder="Tags (comma-separated)"
            onChange={(e) => handleInputChange(index, 'tags', e.target.value)}
          />

          {!isFormValid(
            project.title,
            project.description,
            project.link,
            project.tags || ''
          ) && <div className="error-message">Invalid input. Please check your data.</div>}

          {!isSpellingValid(project.title) && (
            <div className="error-message">Spelling error in the project title.</div>
          )}

          {projects.length > 1 && (
            <button onClick={() => handleRemoveProject(index)}>Remove</button>
          )}
        </div>
      ))}

      {projects.length < 6 && (
        <button onClick={handleAddProject}>Add Project</button>
      )}
    </div>
  );
}

export default ResumeProjects;
