import React, { useState, useEffect } from 'react';
import ResumeLayout1 from './layouts/layout1.js';
import ResumeLayout2 from './layouts/layout2.js';
import ResumeLayout3 from './layouts/layout3.js';
import html2pdf from 'html2pdf.js';

const generatePdf = () => {
    const element = document.getElementById('layout');
    const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
};
const DynamicResume = ({ layout, style, selectedSections, sectionData}) => {
    
    const getSectionsByLayout = () => {
        switch (layout) {
            case 'layout1':
                return (
                    <div id = "layout">
                    <ResumeLayout1
                        layout={layout}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                    </div>
                );
            case 'layout2':
                return (
                    <div id = "layout">
                    <ResumeLayout2
                        layout={layout}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                    </div>
                );
            case 'layout3':
                return (
                    <div id = "layout">
                    <ResumeLayout3
                        layout={layout}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                    </div>
                );
            default:
                return <p>Invalid layout type</p>;
        }
    }

    return (
        <div>
            {getSectionsByLayout()}
            <button onClick={generatePdf}>Generate PDF</button>
        </div>
    );
}

export default DynamicResume;
