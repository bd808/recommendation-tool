import React from 'react';
import SvgImage from './SvgImage';

function NextImage(props) {
    return (
        <SvgImage width="24" height="24" viewBox="0 0 24 24" {...props} svgInternals={`
            <g id="move-ltr">
                <path id="arrow" d="M8.935 7.18l5.302 5.303-5.302 5.303L10.35 19.2l6.715-6.717-6.716-6.716z"/>
            </g>`} />
    );
}

export default NextImage;
