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
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './css/form.css';

function ResumeForm() {
    const navigate = useNavigate();
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

const maxSelectedSections = 3;

const handleSelectionChange = (sectionName, isSelected) => {
  if (isSelected && selectedSections.length < maxSelectedSections) {
    setSelectedSections((prevSections) => [...prevSections, sectionName]);
  } else if (!isSelected) {
    setSelectedSections((prevSections) =>
      prevSections.filter((section) => section !== sectionName)
    );
  }
};

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (section, field, value) => {
    setFormData(prevData => ({
        ...prevData,
        [section]: {
            ...prevData[section],
            [field]: value,
        }
    }));
};

    
  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const transformFormDataForMongoDB = (formData) => {
    const selections = formData.ResumeSelections;
    const transformedData = { 
        controller: {
            resumeTitle: selections.resumeTitle,
            layout: selections.layout,
            style: selections.style,
            sections: selections
        }
    };

    if (selections.contact) {
        transformedData.contact = { ...formData.ResumeContactInfo };
    }
    if (selections.socials) {
        transformedData.socials = formData.ResumeSocialMedia.profile;
    }
    if (selections.about) {
        transformedData.about = formData.ResumeAbout;
    }
    if (selections.education) {
        transformedData.education = formData.ResumeEducation;
    }
    if (selections.courses) {
        transformedData.courses = formData.ResumeCourses.course;
    }
    if (selections.certifications) {
        transformedData.certifications = formData.ResumeCertifications.certification;
    }
    if (selections.publications) {
        transformedData.publications = formData.ResumePublications.publication;
    }
    if (selections.languages) {
        transformedData.languages = formData.ResumeLanguages.language;
    }
    if (selections.projects) {
        transformedData.projects = formData.ResumeProjects.project;
    }
    if (selections.experience) {
        transformedData.experience = formData.ResumeExperience.job;
    }
    if (selections.skills) {
        transformedData.skills = formData.ResumeSkills.skill;
    }

    return transformedData;
};
  
  const [message, setMessage] = useState(''); // For displaying error messages

  async function handleSubmit(e) {
    console.log('button')

    e.preventDefault();

    try {
        const transformedData = transformFormDataForMongoDB(formData);
        const response = await axios.post("http://localhost:3000/resume/form", transformedData);

        if (response.data === "Resume submission successful") {
            navigate("/home");
        } else {
            setMessage("Error submitting resume");
        }
    } catch (error) {
        console.error("Resume submission error", error.message);
        setMessage("Error during resume submission");
    }
}
  
  

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
      {currentStep != 1 && <button onClick={handlePrev} disabled={currentStep === 1}>
        Back
      </button>}
      {currentStep < 13 && <button
        onClick={handleNext}
        disabled={currentStep === 1 && formData.ResumeSelections.resumeTitle.trim() === ''}
      >
        Next
      </button>}
      {currentStep === 13 && <button onClick={handleSubmit}>Submit</button>}
    </div>
  );
  }

export default ResumeForm;