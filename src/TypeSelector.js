import React from "react";
import Dropdown from "./Dropdown";
import I18nText from "./I18n";
import SelectorImage from "./images/SelectorImage";

class TypeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentType: this.props.type};
    }

    onSelect(type) {
        this.setState({currentType: type});
        this.props.onSetType(type);
    }

    render() {
        let dropdownItems = [];
        for (const key of Object.keys(this.props.types)) {
            dropdownItems.push({
                label: this.props.types[key].i18nKey,
                value: key
            });
        }
        return (
            <Dropdown items={dropdownItems} onSelect={this.onSelect.bind(this)}>
                <div className="rt-button">
                    <I18nText className="rt-selector-text" name={this.props.types[this.state.currentType].i18nKey}/>
                    <SelectorImage />
                </div>
            </Dropdown>
        );
    }
}

export default TypeSelector;
