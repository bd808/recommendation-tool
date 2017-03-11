import React from 'react';
import Dropdown from './Dropdown';
import I18nText from './I18n';
import SelectorImage from './images/SelectorImage';

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
        let dropdownMap = {};
        for (const key of Object.keys(this.props.types)) {
            dropdownMap[key] = this.props.types[key].i18nKey;
        }
        return (
            <div className="rt-selector-container">
                <Dropdown items={dropdownMap} onSelect={this.onSelect.bind(this)}>
                    <div className="rt-button">
                        <I18nText className="rt-selector-text" name={dropdownMap[this.state.currentType]} />
                        <SelectorImage />
                    </div>
                </Dropdown>
            </div>
        );
    }
}

export default TypeSelector;
