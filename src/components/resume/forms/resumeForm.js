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
        profiles: [{}]
      },
      ResumeAbout: {
        sectionHeading: '',
        summary: '',
      },
      ResumeEducation: {
        sectionHeading: '',
        school: [{}]
      },
      ResumeCourses: {
        sectionHeading: '',
        course: [{}]
      },
      ResumeCertifications: {
        sectionHeading: '',
        certification:[{}]
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
    skills: []
    }
  });

  const updateFormData = (section, field, value) => {
    const updatedFormData = { ...formData };
    updatedFormData[section][field] = value;
    setFormData(updatedFormData);
  };


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
        transformedData.socials = formData.ResumeSocialMedia;
    }
    if (selections.about) {
        transformedData.about = formData.ResumeAbout;
    }
    if (selections.education) {
        transformedData.education = formData.ResumeEducation;
    }
    if (selections.courses) {
        transformedData.courses = formData.ResumeCourses;
    }
    if (selections.certifications) {
        transformedData.certifications = formData.ResumeCertifications;
    }
    if (selections.publications) {
        transformedData.publications = formData.ResumePublications;
    }
    if (selections.languages) {
        transformedData.languages = formData.ResumeLanguages;
    }
    if (selections.projects) {
        transformedData.projects = formData.ResumeProjects;
    }
    if (selections.experience) {
        transformedData.experience = formData.ResumeExperience;
    }
    if (selections.skills) {
        transformedData.skills = formData.ResumeSkills;
    }
    console.log("Transformed Data:", transformedData); 
    return transformedData;
};
  
  const [message, setMessage] = useState(''); // For displaying error messages

  async function handleSubmit(e) {
    console.log("Cookies:", document.cookie);

    e.preventDefault();

    try {
        const transformedData = transformFormDataForMongoDB(formData);
        const response = await axios.post("http://localhost:3000/resume/form", transformedData, {withCredentials: true});

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
            handleChange={updateFormData}
            data={formData.ResumeSelections}
          />
        );
      case 2:
        if (formData.ResumeSelections.contact) {
          return (
            <ResumeContactInfo
              handleChange={updateFormData}
              data={formData.ResumeContactInfo}
            />
          );
        }
        return renderNextStep();

      case 3:
        if (formData.ResumeSelections.socials) {
          return (
            <ResumeSocialMedia
              handleChange={updateFormData}
              data={formData.ResumeSocialMedia}
            />
          );
        }
        return renderNextStep();
      
      case 4:
        if (formData.ResumeSelections.about) {
          return (
            <ResumeAbout
              handleChange={updateFormData}
              data={formData.ResumeAbout}
            />
          );
        }
        return renderNextStep();

      case 5:
        if (formData.ResumeSelections.education) {
          return (
            <ResumeEducation
              handleChange={updateFormData}
              data={formData.ResumeEducation}
            />
          );
        }
        return renderNextStep();
      
      case 6:
        if (formData.ResumeSelections.courses) {
          return (
            <ResumeCourses
              handleChange={updateFormData}
              data={formData.ResumeCourses}
            />
          );
        }
        return renderNextStep();

    case 7:
      if (formData.ResumeSelections.certifications) {
        return (
          <ResumeCertifications
            handleChange={updateFormData}
            data={formData.ResumeCertifications}
          />
        );
      }
      return renderNextStep();

    case 8:
      if (formData.ResumeSelections.publications) {
        return (
          <ResumePublications
            handleChange={updateFormData}
            data={formData.ResumePublications}
          />
        );
      }
      return renderNextStep();

    case 9:
      if (formData.ResumeSelections.languages) {
        return (
          <ResumeLanguages
            handleChange={updateFormData}
            data={formData.ResumeLanguages}
          />
        );
      }
      return renderNextStep();

    case 10:
      if (formData.ResumeSelections.projects) {
        return (
          <ResumeProjects
            handleChange={updateFormData}
            data={formData.ResumeProjects}
          />
        );
      }
      return renderNextStep();

    case 11:
      if (formData.ResumeSelections.experience) {
        return (
          <ResumeExperience
            handleChange={updateFormData}
            data={formData.ResumeExperience}
          />
        );
      }
      return renderNextStep();

    case 12:
      if (formData.ResumeSelections.skills) { 
        return (
          <ResumeSkills
            handleChange={updateFormData}
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
    <div className="resume-form-container">
      {renderForm()}
      {currentStep !== 1 && (
        <button className="form-button" onClick={handlePrev} disabled={currentStep === 1}>
          Back
        </button>
      )}
      {currentStep < 13 && (
        <button
          className="form-button"
          onClick={handleNext}
          disabled={currentStep === 1 && formData.ResumeSelections.resumeTitle.trim() === ''}
        >
          Next
        </button>
      )}
      {currentStep === 13 && (
        <button className="form-button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
}

export default ResumeForm;