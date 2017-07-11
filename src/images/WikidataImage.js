import React from "react";
import SvgImage from "./SvgImage";

function WikidataImage(props) {
    return (
        <SvgImage width="1050" height="590" viewBox="0 0 1050 590" {...props} svgInternals={`
            <path d="m 120,545 h 30 V 45 H 120 V 545 z m 60,0 h 90 V 45 H 180 V 545 z M 300,45 V 545 h 90 V 45 h -90 z" style="fill:#990000" />
            <path d="m 840,545 h 30 V 45 H 840 V 545 z M 900,45 V 545 h 30 V 45 H 900 z M 420,545 h 30 V 45 H 420 V 545 z M 480,45 V 545 h 30 V 45 h -30 z" style="fill:#339966" />
            <path d="m 540,545 h 90 V 45 h -90 V 545 z m 120,0 h 30 V 45 H 660 V 545 z M 720,45 V 545 h 90 V 45 H 720 z" style="fill:#006699" />
        `}/>
    );
}

export default WikidataImage;
