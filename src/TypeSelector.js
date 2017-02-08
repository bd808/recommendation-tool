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
    }

    render() {
        let dropdownMap = {};
        for (const key of Object.keys(this.props.types)) {
            dropdownMap[key] = this.props.types[key].i18nKey;
        }
        return (
            <div className="gf-selector-container">
                <Dropdown items={dropdownMap} onSelect={this.onSelect.bind(this)}>
                    <div className="gf-selector-button-container gf-clickable">
                        <I18nText className="gf-selector-text" name={dropdownMap[this.state.currentType]}/>
                        <div className="gf-icon gf-icon-expand"></div>
                    </div>
                </Dropdown>
            </div>
        );
    }
}

export default TypeSelector;
