import React from 'react';
import SvgImage from './SvgImage';

function PreviousImage(props) {
    return (
        <SvgImage width="24" height="24" viewBox="0 0 24 24" {...props} svgInternals={`
            <g id="move-rtl">
                <path id="arrow" d="M15.065 17.786l-5.302-5.303 5.302-5.302-1.415-1.41-6.714 6.72 6.714 6.71z"/>
            </g>`} />
    );
}

export default PreviousImage;
