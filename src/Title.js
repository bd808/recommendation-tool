import React from 'react';
import './Title.css';
import {I18nText} from './I18n';

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

class TitleMenu extends React.Component {
    render() {
        return (
            <div className="gf-icon gf-icon-menu gf-flex-float-right gf-clickable"></div>
        );
    }
}

/**
 <div className="dropdown-menu dropdown-menu-right">
 <a class="dropdown-item" href="https://github.com/wikimedia/research-recommendation-api"
 data-i18n="menu-source-code">Source code</a>
 <a class="dropdown-item" href="https://wikimediafoundation.org/wiki/Recommendations_Tool_Privacy_Statement"
 data-i18n="menu-privacy-statement">Privacy statement</a>
 </div>
 **/

export default Title;
