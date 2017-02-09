import React from 'react';
import SvgImage from './SvgImage';

function CloseImage(props) {
    return (
        <SvgImage width="24" height="24" viewBox="0 0 24 24" {...props} svgInternals={`
            <g id="close">
                <path id="cross" d="M17.4 8.1c.8-.8.8-2 0-2.8L12 10.8 7.4 6.2 6 7.6l4.6 4.6-4 4c-.8.8-.8 2 0 2.8l5.4-5.4 4.6 4.6 1.4-1.4-4.6-4.6z"/>
            </g>`} />
    );
}

export default CloseImage;
