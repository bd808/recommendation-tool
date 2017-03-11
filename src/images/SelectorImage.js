import React from 'react';
import SvgImage from './SvgImage';

function SelectorImage(props) {
    return (
        <SvgImage width="24" height="24" viewBox="0 0 24 24" {...props} svgInternals={`
            <g id="viewCompact">
        <circle cx="6" cy="6" r="2"/>
        <circle cx="12" cy="6" r="2"/>
        <circle cx="18" cy="6" r="2"/>
        <circle cx="6" cy="12" r="2"/>
        <circle cx="12" cy="12" r="2"/>
        <circle cx="18" cy="12" r="2"/>
        <circle cx="6" cy="18" r="2"/>
        <circle cx="12" cy="18" r="2"/>
        <circle cx="18" cy="18" r="2"/>
    </g>`} />
    );
}

export default SelectorImage;
