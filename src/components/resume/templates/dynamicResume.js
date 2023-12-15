import React, { useState, useEffect } from 'react';
import ResumeLayout1 from './layouts/layout1.js';
import ResumeLayout2 from './layouts/layout2.js';
import ResumeLayout3 from './layouts/layout3.js';
import html2pdf from 'html2pdf.js';
import { Button, Container } from 'semantic-ui-react';

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
const DynamicResume = ({ layout, style, selectedSections, sectionData}) => {
    
    const getSectionsByLayout = () => {
        switch (layout) {
            case 'layout1':
                return (
                    <Container>
                    <div id = "layout">
                    <ResumeLayout1
                        layout={layout}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                    </div>
                    </Container>
                );
            case 'layout2':
                return (
                    <Container>
                    <div id = "layout">
                    <ResumeLayout2
                        layout={layout}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                    </div>
                    </Container>
                );
            case 'layout3':
                return (
                    <Container>
                    <div id = "layout">
                    <ResumeLayout3
                        layout={layout}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                    </div>
                    </Container>
                );
            default:
                return <p>Invalid layout type</p>;
        }
    }

    return (
        <div>
            {getSectionsByLayout()}
            <Button  class="ui huge red button" onClick={generatePdf}>Generate PDF</Button>
        </div>
    );
}

export default DynamicResume;
