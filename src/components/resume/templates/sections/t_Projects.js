import React from 'react';
import { processItems } from '../../../../helper/ComparisonFunctions.js';

const ProjectsSection = ({ projects }) => {
  if (!projects || !projects.project || !Array.isArray(projects.project)) {
    return <div className="projects-section">No project data available.</div>;
  }

  const jobTags = [
    'React',
    'JavaScript',
    'HTML',
    'CSS',
    'otherStuff', 
    'stuff',
    'things'
  ];

  const sortedProjects = processItems(projects.project, jobTags, 'title');
  const limitedProjects = sortedProjects.slice(0, 5);

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
