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
                <I18nText className="Title-display-secondary" name='title-wikipedia'/>
                <I18nText className="Title-display-main" name={this.props.title}/>
                <I18nText className="Title-display-version" name='title-alpha'/>
                <TitleMenu />
            </div>
        );
    }
}

export default Title;
