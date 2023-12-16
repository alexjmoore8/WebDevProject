import React, { useEffect, useState } from "react";
import html2pdf from 'html2pdf.js';
import { Button, Container } from 'semantic-ui-react';
import ResumeLayout1 from './templates/layouts/layout1.js';
import ResumeLayout2 from './templates/layouts/layout2.js';
import ResumeLayout3 from './templates/layouts/layout3.js';
import fakeResume from "./fakeResume.json";

const generatePdf = () => {
    const element = document.getElementById('layout');
    const opt = {
        margin: 0.4,
        filename: 'resume.pdf',
        html2canvas: { scale: .9 },
        pagebreak: { mode: 'avoid-all'},
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
};

const LayoutComponents = {
  layout1: ResumeLayout1,
  layout2: ResumeLayout2,
  layout3: ResumeLayout3,
};

const Controller = () => {
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        setResumeData(fakeResume);

    }, []);

    console.log(resumeData);

    if (!resumeData) {
        return <div>Loading...</div>;
    }

    const { controller, ...sections } = resumeData;

    const SelectedLayout = LayoutComponents[controller.layout];

    const sectionData = {
        controller,
        ...sections
    };

    return (
        <div>
            {SelectedLayout ? (
                <Container>
                    <div id="layout">
                        <SelectedLayout
                            layout={controller.layout}
                            selectedSections={Object.keys(controller.sections || {}).filter((section) => controller.sections[section])}
                            sectionData={sectionData}
                        />
                    </div>
                </Container>
            ) : (
                <p>Invalid layout type</p>
            )}
            <Button className="ui huge red button" onClick={generatePdf}>
                Generate PDF
            </Button>
        </div>
    );
};

export default Controller;
