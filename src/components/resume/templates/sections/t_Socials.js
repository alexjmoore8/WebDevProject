import React from "react";

const SocialsSection = ({ data }) => {
    return (
        <div>
            <h2>{data.name}</h2>
            <h3>{data.link}</h3>
            <h4>{data.platformType}</h4>
            <SocialsSection data={data} />
        </div>
    );
}

export default SocialsSection;