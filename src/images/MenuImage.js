import React from 'react';
import SvgImage from './SvgImage';

function MenuImage(props) {
    return (
        <SvgImage width="24" height="24" viewBox="0 0 24 24" {...props} svgInternals={`
            <g id="menu">
                <path id="lines" d="M6 15h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1zm-1-4v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1zm0-5v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1z"/>
            </g>`} />
    );
}

export default MenuImage;
