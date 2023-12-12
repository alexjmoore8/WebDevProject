import React from 'react';

const ProjectsSection = ({ projects }) => {
  if (!projects || !projects.project || !Array.isArray(projects.project)) {
    return <div className="projects-section">No project data available.</div>;
  }

  return (
    <div className="projects-section">
      <div className="projects-heading"><h2>{projects.sectionHeading}</h2></div>
      {projects.project.map((project, index) => (
        <div key={index} className="project-item">
          <div className="project-title"><h3>{project.title}</h3></div>
          <div className="project-description"><p className="description">{project.description}</p></div>
          <div className="project-link">
            <a href={project.link} target="_blank" rel="">
              {project.link}
            </a>
          </div>
          <div className="tags">{`Tags: ${project.tags.join(', ')}`}</div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsSection;
