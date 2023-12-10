import React, { useState, useEffect } from 'react';
import ResumeLayout1 from './layouts/layout1.js';
// import ResumeLayout2 from './layouts/layout2.js';
// import ResumeLayout3 from './layouts/layout3.js';


const DynamicResume = ({ layout, style, selectedSections, sectionData}) => {
    
    const getSectionsByLayout = () => {
        switch (layout) {
            case 'layout1':
                return (
                    <ResumeLayout1
                        layout={layout}
                        style={style}
                        selectedSections={selectedSections}
                        sectionData={sectionData}
                    />
                );
            // case 'layout2':
            //     return (
            //         <ResumeLayout2
            //             layout={layout}
            //             style={style}
            //             selectedSections={selectedSections}
            //             sectionData={sectionData}
            //         />
            //     );
            // case 'layout3':
            //     return (
            //         <ResumeLayout3
            //             layout={layout}
            //             style={style}
            //             selectedSections={selectedSections}
            //             sectionData={sectionData}
            //         />
            //     );
            default:
                return <p>Invalid layout type</p>;
        }
    }

    return (
        <div>
            {getSectionsByLayout()}
        </div>
    );
}

export default DynamicResume;
