import React from "react";
import I18nText from "./I18n";
import Dropdown from "./Dropdown";
import ExpandImage from "./images/ExpandImage";
import {getSources} from "./LanguagePairs";
import "./LanguageSelector.css";

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            languages: this.props.languages || getSources()
        };
    }

    onSelect(language) {
        this.props.onSelect(language);
        this.setState({value: language});
    }

    itemFactory(key, item) {
        let extraAttributes = {};
        if (this.props.onSelect !== undefined) {
            extraAttributes.onClick = () => this.onSelect.bind(this)(item.value);
        }

        let innerClass = 'LanguageSelector-item';
        let outerClass = 'LanguageSelector-item-container';

        return (
            <div className={outerClass} key={key} {...extraAttributes}>
                <I18nText className={innerClass} name={item.label}/>
            </div>
        );
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
            <Dropdown items={dropdownItems} onSelect={this.onSelect.bind(this)}
                      itemFactory={this.itemFactory.bind(this)} className="LanguageSelector-container">
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
    languages: React.PropTypes.array,
    onSelect: React.PropTypes.func.isRequired
};

export default LanguageSelector;
