import React from 'react';
import AboutSection from '../sections/t_About.js';
import CertificationSection from '../sections/t_Certifications.js';
import ContactSection from '../sections/t_ContactInfo.js';
import CoursesSection from '../sections/t_Courses.js';
import EducationSection from '../sections/t_Education.js';
import ExperienceSection from '../sections/t_Experience.js';
import LanguagesSection from '../sections/t_Languages.js';
import ProjectsSection from '../sections/t_Projects.js';
import PublicationsSection from '../sections/t_Publications.js';
import SkillsSection from '../sections/t_Skills.js';

const ResumeLayout1 = ({ layout, selectedSections, sectionData }) => {
  const cssFile = `${sectionData.controller.style}.css`;
  import(`../styles/${cssFile}`);

  return (
    
    <body className="resume-layout" layout={layout}>
            <h1 className="resume-title">{sectionData.contact.firstName} {sectionData.contact.lastName}</h1>
            <h6 className="pronouns">{sectionData.contact.pronouns}</h6>
          <div>
            <ContactSection contact={sectionData.contact} socialsData={sectionData.socials} />
          </div>
          
          <hr className="line" />

          {selectedSections && selectedSections.includes('about') && (
            <div className="about-section" class="left">
            <AboutSection about={sectionData.about} />
            </div>
          )}

          <div className="education-section" class="left">
            <EducationSection education={sectionData.education} />
          </div>

          {selectedSections && selectedSections.includes('experience') && (
            <div className="experience-section" class="left">
              <ExperienceSection experience={sectionData.experience} />
            </div>
          )}

          {selectedSections && selectedSections.includes('projects') && (
            <div className="projects-section" class="left">
              <ProjectsSection projects={sectionData.projects} />
            </div>
          )}
          
          {selectedSections && selectedSections.includes('courses') && (
            <div className="courses-section" class="right">
              <CoursesSection courses={sectionData.courses} />
            </div>
          )}

          {selectedSections && selectedSections.includes('certifications') && (
            <div className="certifications-section" class="right">
              <CertificationSection certifications={sectionData.certifications} />
            </div>
          )}

          {selectedSections && selectedSections.includes('languages') && (
            <div className="languages-section" class="right">
              <LanguagesSection languages={sectionData.languages} />
            </div>
          )}

          {selectedSections && selectedSections.includes('publications') && (
            <div className="publications-section" class="right">
              <PublicationsSection publications={sectionData.publications} />
            </div>
          )}

          {selectedSections && selectedSections.includes('skills') && (
            <div className="skills-section" class="right">
              <SkillsSection skills={sectionData.skills} />
            </div>
          )}

    </body>
  );
}

export default ResumeLayout1;
