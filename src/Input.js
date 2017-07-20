import React from "react";
import "whatwg-fetch";
import TypeSelector from "./TypeSelector";
import LanguageSelector from "./LanguageSelector";
import Search from "./Search";
import "./Input.css";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                source: props.queryParams.source || undefined,
                target: props.queryParams.target || undefined,
                seed: props.queryParams.seed || ''
            }
        };
    }

    submitOnLoad() {
        if (this.props.types[this.props.type].submitOnLoad === true) {
            this.submitInput();
        }
    }

    setSource(language) {
        this.setValueAndSubmit('source', language);
    }

    setTarget(language) {
        this.setValueAndSubmit('target', language);
    }

    setSeed(value) {
        this.setValue('seed', value);
    }

    setSeedAndSubmit(value) {
        this.setValueAndSubmit('seed', value);
    }

    setValueAndSubmit(name, value) {
        this.setValue(name, value, this.submitInput);
    }

    setValue(name, value, callback) {
        this.setState((prevState, props) => {
            let newValues = prevState.values;
            newValues[name] = value;
            return {values: newValues};
        }, callback);
    }

    onSubmit(event) {
        this.submitInput();
        event.preventDefault();
    }

    submitInput() {
        let values = {};
        for (const key of Object.keys(this.state.values)) {
            if (this.hasParameter(key)) {
                let value = this.state.values[key];
                if (value !== undefined && value !== '') {
                    values[key] = value;
                }
            }
        }
        this.props.onSubmit(values);
    }

    hasParameter(name) {
        return this.props.params.indexOf(name) !== -1;
    }

    render() {
        let parameters = [];
        let searchBar = [];
        parameters.push(<TypeSelector key="type-selector" types={this.props.types} type={this.props.type}
                                      params={this.state.values} onSetType={this.props.onSetType}/>);
        if (this.hasParameter('source')) {
            parameters.push(<LanguageSelector key="source" value={this.state.values.source} name="selector-source"
                                              languages={undefined}
                                              onSelect={this.setSource.bind(this)}/>);
        }
        if (this.hasParameter('target')) {
            parameters.push(<LanguageSelector key="target" value={this.state.values.target} name="selector-target"
                                              languages={undefined}
                                              onSelect={this.setTarget.bind(this)}/>);
        }
        parameters.push(<div key="search" className="rt-button-primary" onClick={this.submitInput.bind(this)}>
            Search
        </div>);
        if (this.hasParameter('seed')) {
            searchBar.push(
                <Search
                    key="seed"
                    value={this.state.values.seed}
                    placeholderName="seed-placeholder"
                    onChange={this.setSeed.bind(this)}
                    onSubmit={this.setSeedAndSubmit.bind(this)}
                />
            );
        }
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="Input-container">
                    {parameters}
                </div>
                {searchBar}
            </form>
        );
    }
}

export default Input;
