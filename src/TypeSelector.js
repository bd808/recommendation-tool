import React from 'react';
import Dropdown from './Dropdown';
import I18nText from './I18n';

class TypeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentType: this.props.defaultType};
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
                        <I18nText className="rt-selector-text" name={dropdownMap[this.state.currentType]}/>
                        <div className="rt-icon rt-icon-expand"></div>
                    </div>
                </Dropdown>
            </div>
        );
    }
}

export default TypeSelector;
