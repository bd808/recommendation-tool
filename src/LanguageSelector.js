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
        let dropdownItems = [];
        for (const language of this.state.languages) {
            dropdownItems.push({
                label: window.jQuery.uls.data.getAutonym(language),
                value: language
            });
        }
        const name = this.state.value ? window.jQuery.uls.data.getAutonym(this.state.value) : this.props.name;
        return (
            <Dropdown items={dropdownItems} onSelect={this.onSelect.bind(this)} align="right">
                <div className="rt-button">
                    <I18nText className="rt-selector-text" name={name}/>
                    <ExpandImage />
                </div>
            </Dropdown>
        );
    }
}
LanguageSelector.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    onSelect: React.PropTypes.func.isRequired
};

export default LanguageSelector;
