import React from "react";
import { CheckboxSection } from "./sectionComponents/selectionCheckbox.js";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";

function ResumeSelections({data, handleChange, handleSectionChange}) {
    const handleCheckboxChange = (name) => {
        handleChange('ResumeSelections', name, !data[name]);
    };

    return (
        <div>
            <h2>Resume Selections</h2>
            
            <label>ResumeTitle:</label>
            <input
                type="text"
                name="resumeTitle"
                value={data.resumeTitle}
                placeholder="Resume Title is required"
                onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
            />

            <label>Layout:</label>
            <select
                name="layout"
                value={data.layout}
                onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
            >
                <option value="layout1">Layout 1</option>
                <option value="layout2">Layout 2</option>
                <option value="layout3">Layout 3</option>
            </select>

            <label>Style:</label>
            <select
                name="style"
                value={data.style}
                onChange={(e) => handleChange('ResumeSelections', e.target.name, e.target.value)}
            >
                <option value="style1">Style 1</option>
                <option value="style2">Style 2</option>
                <option value="style3">Style 3</option>
            </select>

            <label>Sections:</label>
            <div>
                <CheckboxSection
                    name="contact"
                    checked={data.contact}
                    onChange={() => handleCheckboxChange("contact")}
                    disabled={true}
                />

                <CheckboxSection
                    name="socials"
                    checked={data.socials}
                    onChange={() => handleCheckboxChange("socials")}
                />

                <CheckboxSection
                    name="about"
                    checked={data.about}
                    onChange={() => handleCheckboxChange("about")}
                />

                <CheckboxSection
                    name="educations"
                    checked={data.education}
                    onChange={() => handleCheckboxChange("education")}
                    disabled={true}
                />

                <CheckboxSection
                    name="courses"
                    checked={data.courses}
                    onChange={() => handleCheckboxChange("courses")}
                />

                <CheckboxSection
                    name="certifications"
                    checked={data.certifications}
                    onChange={() => handleCheckboxChange("certifications")} 
                />

                <CheckboxSection
                    name="publications"
                    checked={data.publications}
                    onChange={() => handleCheckboxChange("publications")}
                />

                <CheckboxSection
                    name="languages"
                    checked={data.languages}
                    onChange={() => handleCheckboxChange("languages")}
                />

                <CheckboxSection
                    name="projects"
                    checked={data.projects}
                    onChange={() => handleCheckboxChange("projects")}
                />

                <CheckboxSection
                    name="experience"
                    checked={data.experience}
                    onChange={() => handleCheckboxChange("experience")}
                    disabled={true}
                />

                <CheckboxSection
                    name="skills"
                    checked={data.skills}
                    onChange={() => handleCheckboxChange("skills")}
                />
            </div>

        </div>
)};

export default ResumeSelections;
    