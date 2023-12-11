import React from 'react';

const ProjectsSection = ({ projects }) => {
  if (!projects || !projects.project || !Array.isArray(projects.project)) {
    return <div>No project data available.</div>;
  }

  return (
    <div>
      <div>{projects.sectionHeading}</div>
      {projects.project.map((project, index) => (
        <div key={index}>
          <div>{project.title}</div>
          <div>{project.description}</div>
          <div>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.link}
            </a>
          </div>
          <div>{`Tags: ${project.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsSection;
