import React from "react";
import I18nText from "./I18n";
import Dropdown from "./Dropdown";
import ExpandImage from "./images/ExpandImage";
import {getSources} from "./LanguagePairs";

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            languages: getSources()
        };
    }

    onSelect(language) {
        this.props.onSelect(language);
        this.setState({value: language});
    }

    render() {
        let dropdownMap = {};
        for (const language of this.state.languages) {
            dropdownMap[language] = window.jQuery.uls.data.getAutonym(language);
        }
        const name = this.state.value ? window.jQuery.uls.data.getAutonym(this.state.value) : this.props.name;
        return (
            <Dropdown items={dropdownMap} onSelect={this.onSelect.bind(this)}>
                <div className="rt-button">
                    <I18nText className="rt-selector-text" name={name}/>
                    <ExpandImage />
                </div>
            </Dropdown>
        );
    }
}

export default LanguageSelector;
