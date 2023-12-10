import React, { useEffect, useState } from "react";
import DynamicResume from "./templates/dynamicResume.js";
import fakeResume from "./fakeResume.json";

const Controller = () => {
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        setResumeData(fakeResume);

    }, []);

    console.log(resumeData);

    if (!resumeData) {
        return <div>Loading...</div>;
    }

    const { 
        controller,
        contact,
        socials,
        about,
        education,
        courses,
        certifications,
        publications,
        languages,
        projects,
        workExperience,
        volunteerExperience,
        skills
     } = resumeData;

    return (
        <div>
            <DynamicResume
                layout={controller.layout}
                // style={controller.style}
                selectedSections={Object.keys(controller.sections || {}).filter((section) => controller.sections[section])}
                sectionData={{
                    contact,
                    socials,
                    about,
                    education,
                    courses,
                    certifications,
                    publications,
                    languages,
                    projects,
                    workExperience,
                    volunteerExperience,
                    skills
            }}
            />
        </div>
    );
};

export default Controller;
