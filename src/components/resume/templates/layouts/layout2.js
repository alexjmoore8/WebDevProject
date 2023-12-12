import React from 'react';
import ContactSection from '../sections/t_ContactInfo.js';
import ExperienceSection from '../sections/t_Experience.js';
import EducationSection from '../sections/t_Education.js';
import AboutSection from '../sections/t_About.js';
import CertificationSection from '../sections/t_Certifications.js';
import PublicationsSection from '../sections/t_Publications.js';
import LanguagesSection from '../sections/t_Languages.js';
import CoursesSection from '../sections/t_Courses.js';
import SkillsSection from '../sections/t_Skills.js';
import ProjectsSection from '../sections/t_Projects.js';
import DynamicResume from '../dynamicResume.js';
// import DynamicSection from '../sections/dynamicSection.js';


const ResumeLayout2 = ({ layout, selectedSections, sectionData }) => {
  const cssFile = `${sectionData.controller.style}.css`;
  import(`../styles/${cssFile}`);

  return (
    <div layout={layout}>
      <h1>{sectionData.contact.firstName} {sectionData.contact.lastName}</h1>
          {selectedSections && selectedSections.includes('contact') && (
            <ContactSection
              contact={sectionData.contact}
              socialsData={sectionData.socials}
            />
          )}

            {selectedSections && selectedSections.includes('skills') && (
                <SkillsSection
                skills={sectionData.skills}
                />
          )}

          {selectedSections && selectedSections.includes('about') && (
            <AboutSection
              about={sectionData.about}
            />
          )}

          {selectedSections && selectedSections.includes('education') && (
            <EducationSection
              education={sectionData.education}
            />
          )}
          {selectedSections && selectedSections.includes('courses') && (
            <CoursesSection
              courses={sectionData.courses}
            />
          )}

          {selectedSections && selectedSections.includes('experience') && (
            <ExperienceSection
              experience={sectionData.experience}
            />
          )}
  
          {selectedSections && selectedSections.includes('certifications') && (
            <CertificationSection
              certifications={sectionData.certifications}
            />
          )}

          {selectedSections && selectedSections.includes('languages') && (
            <LanguagesSection
              languages={sectionData.languages}
            />
          )}

          

          {selectedSections && selectedSections.includes('publications') && (
            <PublicationsSection
              publications={sectionData.publications}
            />
          )}

          {selectedSections && selectedSections.includes('projects') && (
            <ProjectsSection
              projects={sectionData.projects}
            />
          )}



          {/* {selectedSections &&
            selectedSections.map((section, index) => (
            <DynamicSection key={index} section={section} data={sectionData[section]} />
          ))} */}
    </div>
  );
}

export default ResumeLayout2;
