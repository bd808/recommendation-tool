import React from 'react';
import './Title.css';
import TitleMenu from './TitleMenu';
import I18nText from './I18n';

class Title extends React.Component {
    render() {
        return (
            <div className="Title-container">
                <div className="gf-icon gf-icon-lightbulb"></div>
                <span className="Title-display-secondary"><I18nText name='title-wikipedia' /></span>
                <span className="Title-display-main"><I18nText name={this.props.title} /></span>
                <span className="Title-display-version"><I18nText name='title-beta' /></span>
                <TitleMenu />
            </div>
        );
    }
}

export default Title;
