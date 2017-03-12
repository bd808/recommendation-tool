import React from 'react';
import I18nText from './I18n';
import Dropdown from './Dropdown';
import ExpandImage from './images/ExpandImage';

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.name};
    }

    onSelect(language) {
        this.setState({name: window.jQuery.uls.data.getAutonym(language)});
        console.log(language);
    }

    render() {
        const items = ['en', 'de'];
        let dropdownMap = {};
        for (const item of items) {
            dropdownMap[item] = window.jQuery.uls.data.getAutonym(item);
        }
        return (
            <Dropdown items={dropdownMap} onSelect={this.onSelect.bind(this)}>
                <div className="rt-button">
                    <I18nText className="rt-selector-text" name={this.state.name} />
                    <ExpandImage />
                </div>
            </Dropdown>
        );
    }
}

export default LanguageSelector;
