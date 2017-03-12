import React from 'react';
import I18nText from './I18n';
import Dropdown from './Dropdown';
import ExpandImage from './images/ExpandImage';
import {getSources} from './LanguagePairs';

class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.name, languages: getSources()};
    }

    onSelect(language) {
        this.setState({name: window.jQuery.uls.data.getAutonym(language)});
        console.log(language);
    }

    render() {
        let dropdownMap = {};
        for (const language of this.state.languages) {
            dropdownMap[language] = window.jQuery.uls.data.getAutonym(language);
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
