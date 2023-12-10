import React from 'react';
import ContactSection from '../sections/t_ContactInfo.js';
import WorkExperienceSection from '../sections/t_WorkExperience.js';
import VolunteerExperienceSection from '../sections/t_VolunteerExperience.js';
import DynamicResume from '../dynamicResume.js';
import DynamicSection from '../sections/dynamicSection.js';
import ExperienceContainer from '../sections/ExperienceContainer.js';


const ResumeLayout1 = ({ layout, style, selectedSections, sectionData }) => {
  console.log('Rendering ResumeLayout1 with props:', { layout, style, selectedSections, sectionData });

  return (
    <div layout={layout} style={style} >
      <h1>{sectionData.contact.firstName} {sectionData.contact.lastName}</h1>
          {selectedSections && selectedSections.includes('contact') && (
            <ContactSection
              contact={sectionData.contact}
              socialsData={sectionData.socials}
            />
          )}

          {selectedSections &&
            selectedSections.map((section, index) => (
            <ExperienceContainer key={index} section={section} data={sectionData[section]} />
          ))}
  
          {selectedSections &&
            selectedSections.map((section, index) => (
            <DynamicSection key={index} section={section} data={sectionData[section]} />
          ))}
    </div>
  );
}

export default ResumeLayout1;
