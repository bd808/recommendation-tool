import React from "react";
import TypeAheadSuggestions from "./TypeAheadSuggestions";
import {I18nCustom} from "./I18n";
import SearchImage from "./images/SearchImage";
import "./Input.css";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', typeAheadValue: ''};
    }

    handleEvent(event) {
        this.setState({value: event.target.value, typeAheadValue: event.target.value});
        this.props.onChange(event.target.value);
    }

    handleKeyDown(event) {
        if(event.keyCode === 13) {
            this.setState({typeAheadValue: ''});
        }
    }

    setValue(value) {
        this.setState({value: value, typeAheadValue: ''});
        this.props.onSubmit(value);
    }

    render() {
        return (
            <div id="Search" className="Input-search-container">
                <SearchImage className="Input-search-icon"/>
                <I18nCustom
                    onChange={this.handleEvent.bind(this)}
                    onKeyDown={this.handleKeyDown.bind(this)}
                    tagName="input"
                    name={this.props.placeholderName}
                    value={this.state.value}
                    attributeName="placeholder"
                    className="Input-search"
                />
                <TypeAheadSuggestions seed={this.state.typeAheadValue} onSelect={this.setValue.bind(this)}/>
            </div>
        );
    }
}
Search.propTypes = {
    placeholderName: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
};

export default Search;
