import React from 'react';
import ContactSection from '../sections/t_ContactInfo.js';
import ExperienceSection from '../sections/t_Experience.js';
import DynamicResume from '../dynamicResume.js';
import DynamicSection from '../sections/dynamicSection.js';


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

          {selectedSections && selectedSections.includes('experience') && (
            <ExperienceSection
              experience={sectionData.experience}
            />
          )}
  
          {selectedSections &&
            selectedSections.map((section, index) => (
            <DynamicSection key={index} section={section} data={sectionData[section]} />
          ))}
    </div>
  );
}

export default ResumeLayout1;
