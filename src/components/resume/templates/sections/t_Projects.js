import React from 'react';

const ProjectsSection = ({ projects }) => {
  if (!projects || !projects.project || !Array.isArray(projects.project)) {
    return <div className="projects-section">No project data available.</div>;
  }

  const uniqueNames = {};
  const filteredProjects = projects.project.filter((project, index) => {
    if (!uniqueNames[project.title]) {
        uniqueNames[project.title] = true;
        return true;
      }
      return false;
    });

  // TODO add tag comparison
  const limitedProjects = filteredProjects.slice(0, 5);

  return (
    <div className="projects-section">
      <div className="projects-heading"><h2>{projects.sectionHeading}</h2></div>
      {limitedProjects.map((project, index) => (
        <div key={index} className="project-item">
          <div className="project-title"><h3>{project.title}</h3></div>
          <div className="project-description"><p className="description">{project.description}</p></div>
          <div className="project-link">
            <a href={project.link} target="_blank" rel="">
              {project.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsSection;
