import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import "../css/results.css"

function ResumeProjects({ data, handleChange }) {
  const initialProjects = data.projects || [{}];
  const [projects, setProjects] = useState(initialProjects);
  const [includeCustomTitle, setIncludeCustomTitle] = useState(false);

  const handleAddProject = () => {
    if (projects.length < 20) {
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

  const getDefaultSectionTitle = () => {
      return includeCustomTitle ? data.sectionHeading || 'Projects' : 'Projects';
  };

  return (
    <div>
      <h2>Projects</h2>
      <label>
        <input
          type="checkbox"
          name="includeCustomTitle"
          checked={includeCustomTitle}
          onChange={(e) => setIncludeCustomTitle(e.target.checked)}
        />
        Include Custom Section Title
      </label>

      <input
        type="text"
        name="sectionHeading"
        value={getDefaultSectionTitle()}
        placeholder="Section title to display on resume"
        onChange={(e) => handleChange('ResumeProjects', e.target.name, e.target.value)}
        disabled={!includeCustomTitle}
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
            onChange={(e) => handleInputChange(index, 'tags', e.target.value.split(', '))}
          />

          {projects.length > 1 && (
            <button onClick={() => handleRemoveProject(index)}>Remove</button>
          )}
        </div>
      ))}

      {projects.length < 20 && (
        <button onClick={handleAddProject}>Add Project</button>
      )}
     <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}
export default ResumeProjects;
