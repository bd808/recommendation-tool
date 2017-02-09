import React from 'react';

class SvgImage extends React.Component {
    render() {
        let {svgInternals, ...props} = this.props;
        return (
            <svg {...props} dangerouslySetInnerHTML={{__html: svgInternals}} />
        );
    }
}

export default SvgImage;
