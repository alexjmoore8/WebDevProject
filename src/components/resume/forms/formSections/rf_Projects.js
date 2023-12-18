import React, { useState } from 'react';
import GrammarCheck from '../../../grammarCheck/grammarCheck.js';
import FormSectionHeader from './sectionComponents/SectionHeader.js';
import TagsInput from './sectionComponents/tags.js';
import "../css/list.css"

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
      <FormSectionHeader sectionName="Projects" data={data} handleChange={handleChange} />

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

          <TagsInput
            value={project.tags || []}
            onChange={(tagsArray) => handleInputChange(index, 'tags', tagsArray)}
            label="Projects"
          />

          {projects.length > 1 && (
            <button className='list-button' onClick={() => handleRemoveProject(index)}>Remove</button>
          )}
        </div>
      ))}

      {projects.length < 20 && (
        <button className='list-button' onClick={handleAddProject}>Add</button>
      )}
     <GrammarCheck data={data} handleChange={handleChange} />
    </div>
  );
}
export default ResumeProjects;
