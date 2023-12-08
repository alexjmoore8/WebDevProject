import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
// import * as helper from '../../helper/helper.js';
import ResumeSelections from './formSections/rf_Selections.js';
import ResumeContactInfo from './formSections/rf_ContactInfo.js';
import ResumeSocialMedia from './formSections/rf_Socials.js';

function ResumeForm() {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
      ResumeSelections: {
        resumeTitle: '',
        layout: 'layout1',
        style: 'style1',
        contact: true,
        socials: true,
        about: false,
        education: true,
        courses: false,
        certifications: false,
        skills: true,
        publications: false,
        languages: false,
        projects: false,
        workExperience: true,
        volunteerExperience: false,
        },
      ResumeContactInfo: {
        sectionHeading: '',
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        phone: '',
        pronouns: '',
      },
      ResumeSocialMedia: {
        sectionHeading: '',
        name: '',
        link: '',
        platformType: 'other'
        }
    }
    );

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (step, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [step]: {
        ...prevData[step],
        [field]: value,
      },
    }));
  };
    
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
     try {
      // Perform form submission to your server
      const response = await fetch('/resume-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Resume submitted successfully!');
        // Optionally, you can reset the form state or redirect the user
      } else {
        console.error('Error submitting resume');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    const renderForm = () => {
      switch (currentStep) {
        case 1:
          return (
            <ResumeSelections
              handleChange={handleChange}
              data={formData.ResumeSelections}
            />
          );
        case 2:
          return (
            <ResumeContactInfo
              handleChange={handleChange}
              data={formData.ResumeContactInfo}  
            />

          );
        case 3:
          return (
            <ResumeSocialMedia
              handleChange={handleChange}
              data={formData.ResumeSocialMedia}
            />
          );

        default:
          return null;
      }
    };

    return (
        <div>
          {renderForm()}
          <button onClick={handlePrev} disabled={currentStep === 1}>Back</button>
          {currentStep < 3 && <button onClick={handleNext}>Next</button>}
          {currentStep === 3 && <button onClick={handleSubmit}>Submit</button>}
        </div>
    );
}

export default ResumeForm;
















// import React, { useState } from 'react';
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import * as helper from '../../helper/helper.js';
// import ResumeSelections from './rf_Selections.js';
// import SectionForm from './sectionForm.js';


// function ResumeForm() {
//     // const navigate = useNavigate();
//     const [formData, setFormData] = useState({ 
//         ResumeSelections: {
//             resumeTitle: '',
//             layout: 'layout1',
//             style: 'style1',
//             contact: true,
//             socials: true,
//             about: false,
//             education: true,
//             courses: false,
//             certifications: false,
//             skills: true,
//             publications: false,
//             languages: false,
//             projects: false,
//             workExperience: true,
//             volunteerExperience: false,
//         },
//         ContactInfo: {
//           sectionHeading: '',
//           firstName: '',
//           lastName: '',
//           email: '',
//           location: '',
//           phone: '',
//           pronouns: '',
//         },
//         Socials: {
//           sectionHeading: '',
//           name: '',
//           link: '',
//           platformType: 'other'
//         }
//         // },
//         // About: {
//         //   sectionHeading: '',
//         //   summary: '',
//         // },
//         // Education: {
//         //   sectionHeading: '',
//         //   degree: '',
//         //   location: '',
//         //   degree: '',
//         //   major: '',
//         //   startDate: '',
//         //   endDate: '',
//         //   gpa: '',
//         // },
//         // Courses: {
//         //   sectionHeading: '',
//         //   name: '',
//         //   school: '',
//         //   tags: '',
//         // },
//         // Certifications: {
//         //   sectionHeading: '',
//         //   name: '',
//         //   organization: '',
//         //   date: '',
//         //   tags: '',
//         // },
//         // Publications: {
//         //   sectionHeading: '',
//         //   title: '',
//         //   publisher: '',
//         //   date: '',
//         //   link: '',
//         //   tags: '',
//         // },
//         // Languages: {
//         //   sectionHeading: '',
//         //   language: '',
//         //   proficiency: '',
//         // },
//         // Projects: {
//         //   sectionHeading: '',
//         //   title: '',
//         //   description: '',
//         //   link: '',
//         //   tags: '',
//         // },
//         // WorkExperience: {
//         //   sectionHeading: '',
//         //   title: '',
//         //   company: '',
//         //   location: '',
//         //   startDate: '',
//         //   endDate: '',
//         //   bullets: '',
//         //   tags: ''
//         // },
//         // VolunteerExperience: {
//         //   sectionHeading: '',
//         //   position: '',
//         //   organization: '',
//         //   location: '',
//         //   startDate: '',
//         //   endDate: '',
//         //   link: '',
//         //   bullets: '',
//         //   tags: ''
//         // },
//         // Skills: {
//         //   sectionHeading: '',
//         //   skill: '',
//         //   level: '',
//         // }
//     });

//   const [currentStep, setCurrentStep] = useState(1);
//   const [selectedSections, setSelectedSections] = useState([]);

//   const handleChange = (section, field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSectionSelection = (section, selected) => {
//     if (selected) {
//         setSelectedSections((prevSelected) => [...prevSelected, section]);
//     } else {
//       setSelectedSections((prevSelected) =>
//         prevSelected.filter((selectedSection) => selectedSection !== section)
//       );
//     }
//   };
    
//   const handleNext = () => {
//     setCurrentStep((prevStep) => prevStep + 1);
//   };

//   const handlePrev = () => {
//     setCurrentStep((prevStep) => prevStep - 1);
//   };

//   const handleSubmit = async () => {
//      try {
//       // Perform form submission to your server
//       const response = await fetch('/resume-form', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log('Resume submitted successfully!');
//         // Optionally, you can reset the form state or redirect the user
//       } else {
//         console.error('Error submitting resume');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

// const renderForm = () => {
//   const currentSection = selectedSections[currentStep - 1];

//   return (
//     <div>
//       <ResumeSelections
//         data={formData[currentSection]}
//         handleChange={(field, value) => handleChange(currentSection, field, value)}
//         handleSectionSelection={(selected) => handleSectionSelection(currentSection, selected)}
//       />
//       {/* <SectionForm
//         key={currentSection}
//         section={currentSection}
//         data={formData[currentSection]}
//         handleChange={handleChange}
//       /> */}
//       <button onClick={handlePrev} disabled={currentStep === 1}>
//         Back
//       </button>
//       {currentStep < selectedSections.length && (
//         <button onClick={handleNext}>Next</button>
//       )}
//       {currentStep === selectedSections.length && (
//         <button onClick={handleSubmit}>Submit</button>
//       )}
//     </div>
//   );
// };

// };

// export default ResumeForm;
