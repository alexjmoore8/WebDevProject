// TODO: fix back button when section is removed
import React, { useState } from 'react';
import ResumeSelections from './formSections/rf_Selections.js';
import ResumeContactInfo from './formSections/rf_ContactInfo.js';
import ResumeSocialMedia from './formSections/rf_Socials.js';
import ResumeAbout from './formSections/rf_About.js';
import ResumeEducation from './formSections/rf_Education.js';
import ResumeCourses from './formSections/rf_Courses.js';
import ResumeCertifications from './formSections/rf_Certifications.js';
import ResumePublications from './formSections/rf_Publications.js';
import ResumeLanguages from './formSections/rf_Languages.js';
import ResumeProjects from './formSections/rf_Projects.js';
import ResumeExperience from './formSections/rf_Experience.js';
import ResumeSkills from './formSections/rf_Skills.js';
import './css/form.css';

function ResumeForm() {
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({ 
      ResumeSelections: {
        resumeTitle: '',
        layout: 'layout1',
        style: 'style1',
        contact: true,
        socials: true,
        about: true,
        education: true,
        courses: true,
        certifications: true,
        skills: true,
        publications: true,
        languages: true,
        projects: true,
        experience: true,
      },
      ResumeContactInfo: {
        firstName: '',
        lastName: '',
        email: '',
        location: '',
        phone: '',
        pronouns: '',
      },
      ResumeSocialMedia: {
        profile: {
          name: '',
          link: '',
          platformType: ''
        }
      },
      ResumeAbout: {
        sectionHeading: '',
        summary: '',
      },
      ResumeEducation: {
        sectionHeading: '',
        school: {
          institution: '',
          location: '',
          degree: '',
          major: '',
          startDate: '',
          endDate: '',
          gpa: '',
        }
      },
      ResumeCourses: {
        sectionHeading: '',
        course: {
          title: '',
          school: '',
          tags: []
        }
      },
      ResumeCertifications: {
        sectionHeading: '',
        certification: {
          name: '',
          organization: '',
          date: '',
          tags: []
        }
      },
      ResumePublications: {
        sectionHeading: '',
        publication: {
          title: '',
          publisher: '',
          date: '',
          link: '',
          tags: []
        }
      },
      ResumeLanguages: {
        sectionHeading: '',
        language: {
            language: '',
            level: '',
        }
      },
      ResumeProjects: {
        sectionHeading: '',
        project: {
          title: '',
          description: '',
          link: '',
          tags: []
        }
      },
      ResumeExperience: {
        sectionHeading: '',
        job: {
          position: '',
          organization: '',
          location: '',
          startDate: '',
          endDate: '',
          bullets: [],
          tags: []
        }
      },
      ResumeSkills: {
        sectionHeading: '',
        skill: {
          skill: '',
          level: '',
      }
    }
  });

  const [selectedSections, setSelectedSections] = useState([]);

  const handleSectionSelection = (sectionName, isSelected) => {
    if (isSelected) {
      setSelectedSections((prevSections) => [...prevSections, sectionName]);
    } else {
      setSelectedSections((prevSections) =>
        prevSections.filter((section) => section !== sectionName)
      );
    }
  };

  const handleSelectionChange = (sectionName, isSelected) => {
    handleChange('ResumeSelections', sectionName, isSelected);
    handleSectionSelection(sectionName, isSelected);
  };


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

  const transformFormDataForMongoDB = (formData) => {
    return {
      controller: {
        resumeTitle: formData.ResumeSelections.resumeTitle,
        layout: formData.ResumeSelections.layout,
        style: formData.ResumeSelections.style,
        sections: {
          // Add all section booleans here
          contact: formData.ResumeSelections.contact,
          socials: formData.ResumeSelections.socials,
          // ... other sections
        }
      },
      contactInfo: {
        firstName: formData.ResumeContactInfo.firstName,
        lastName: formData.ResumeContactInfo.lastName,
        email: formData.ResumeContactInfo.email,
        location: {
          city: formData.ResumeContactInfo.location, // Assuming city is stored here
          state: '', // TODO: Add state to your form or handle it here
          country: '' // TODO: Add country to your form or handle it here
        },
        phone: formData.ResumeContactInfo.phone,
        pronouns: formData.ResumeContactInfo.pronouns,
      },
      socials: [
        // Assuming multiple social media profiles can be added
        ...formData.ResumeSocialMedia.profile.map(profile => ({
          name: profile.name,
          link: profile.link,
          platformType: profile.platformType
        }))
      ],
      // ... Similar transformations for other sections
    };
  };
  
  
  const handleSubmit = async () => {
    try {
      const transformedData = transformFormDataForMongoDB(formData);
  
      const response = await fetch('/resume-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });
  
      if (response.ok) {
        console.log('Resume submitted successfully!');
        // Additional success handling
      } else {
        console.error('Error submitting resume:', response.statusText);
        // Additional error handling
      }
    } catch (error) {
      console.error('Error:', error);
      // Additional error handling
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
        if (formData.ResumeSelections.contact) {
          return (
            <ResumeContactInfo
              handleChange={handleChange}
              data={formData.ResumeContactInfo}
            />
          );
        }
        return renderNextStep();

      case 3:
        if (formData.ResumeSelections.socials) {
          return (
            <ResumeSocialMedia
              handleChange={handleChange}
              data={formData.ResumeSocialMedia}
            />
          );
        }
        return renderNextStep();
      
      case 4:
        if (formData.ResumeSelections.about) {
          return (
            <ResumeAbout
              handleChange={handleChange}
              data={formData.ResumeAbout}
            />
          );
        }
        return renderNextStep();

      case 5:
        if (formData.ResumeSelections.education) {
          return (
            <ResumeEducation
              handleChange={handleChange}
              data={formData.ResumeEducation}
            />
          );
        }
        return renderNextStep();
      
      case 6:
        if (formData.ResumeSelections.courses) {
          return (
            <ResumeCourses
              handleChange={handleChange}
              data={formData.ResumeCourses}
            />
          );
        }
        return renderNextStep();

    case 7:
      if (formData.ResumeSelections.certifications) {
        return (
          <ResumeCertifications
            handleChange={handleChange}
            data={formData.ResumeCertifications}
          />
        );
      }
      return renderNextStep();

    case 8:
      if (formData.ResumeSelections.publications) {
        return (
          <ResumePublications
            handleChange={handleChange}
            data={formData.ResumePublications}
          />
        );
      }
      return renderNextStep();

    case 9:
      if (formData.ResumeSelections.languages) {
        return (
          <ResumeLanguages
            handleChange={handleChange}
            data={formData.ResumeLanguages}
          />
        );
      }
      return renderNextStep();

    case 10:
      if (formData.ResumeSelections.projects) {
        return (
          <ResumeProjects
            handleChange={handleChange}
            data={formData.ResumeProjects}
          />
        );
      }
      return renderNextStep();

    case 11:
      if (formData.ResumeSelections.experience) {
        return (
          <ResumeExperience
            handleChange={handleChange}
            data={formData.ResumeExperience}
          />
        );
      }
      return renderNextStep();

    case 12:
      if (formData.ResumeSelections.skills) { 
        return (
          <ResumeSkills
            handleChange={handleChange}
            data={formData.ResumeSkills}
          />
        );
      }
      return renderNextStep();

      default:
        return null;
    }
  };


  const renderNextStep = () => {
    const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
  };

  return (
    <div>
      {renderForm()}
      <button onClick={handlePrev} disabled={currentStep === 1}>
        Back
      </button>
      {currentStep < 13 && <button onClick={handleNext}>Next</button>}
      {currentStep === 13 && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
  }

export default ResumeForm;