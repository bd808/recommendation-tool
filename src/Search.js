import React from "react";
import "whatwg-fetch";
import {I18nCustom} from "./I18n";
import SearchImage from "./images/SearchImage";
import "./Input.css";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    setValue(event) {
        this.props.onChange(event.target.value);
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div id="Search" className="Input-search-container">
                <SearchImage className="Input-search-icon"/>
                <I18nCustom onChange={this.setValue.bind(this)} tagName="input" name={this.props.placeholderName}
                            value={this.state.value} attributeName="placeholder" className="Input-search"/>
            </div>
        );
    }
}

export default Search;
