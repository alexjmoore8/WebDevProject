import React from "react";
import ResumeCertificationSection from "./t_Certifications.js";
import ResumePublicationSection from "./t_Publications.js";
import ResumeLanguageSection from "./t_Languages.js";
import ResumeCourseSection from "./t_Courses.js";
import ResumeSkillSection from "./t_Skills.js";
import ResumeProjectSection from "./t_Projects.js";
import ResumeAboutSection from "./t_About.js";


const DynamicSection = ({ section, data }) => {
    switch (section) {
        case 'certifications':
            return <ResumeCertificationSection certifications={data.certifications} />;
        case 'publications':
            return <ResumePublicationSection publications={data.publications} />;
        case 'languages':
            return <ResumeLanguageSection languages={data.languages} />;
        case 'courses':
            return <ResumeCourseSection courses={data.courses} />;
        case 'skills':
            return <ResumeSkillSection skills={data.skills} />;
        case 'projects':
            return <ResumeProjectSection projects={data.projects} />;
        case 'about':
            return <ResumeAboutSection about={data.about} />;
        default:
            return null;
    }
};

export default DynamicSection;