import React from 'react';
import SvgImage from './SvgImage';

function ExpandImage(props) {
    return (
        <SvgImage width="24" height="24" viewBox="0 0 24 24" {...props} svgInternals={`
            <g id="expand">
                <path id="arrow" d="M17.303 8.283L12 13.586 6.697 8.283 5.283 9.697 12 16.414l6.717-6.717z"/>
            </g>`} />
    );
}

export default ExpandImage;
