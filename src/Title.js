import React from "react";
import Lightbulb from "./images/Lightbulb";
import "./Title.css";
import TitleMenu from "./TitleMenu";
import I18nText from "./I18n";

class Title extends React.Component {
    render() {
        return (
            <div className="Title-container">
                <Lightbulb className="Title-icon"/>
                <span className="Title-display-secondary"><I18nText name='title-wikipedia'/></span>
                <span className="Title-display-main"><I18nText name={this.props.title}/></span>
                <span className="Title-display-version"><I18nText name='title-beta'/></span>
                <TitleMenu />
            </div>
        );
    }
}

export default Title;
