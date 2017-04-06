import React from "react";
import "whatwg-fetch";
import TypeSelector from "./TypeSelector";
import LanguageSelector from "./LanguageSelector";
import Search from "./Search";
import {checkStatus, parseJSON} from './util';
import "./Input.css";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spec: [],
            values: {
                source: undefined,
                target: undefined,
                seed: ''
            }
        };
    }

    componentDidMount() {
        this.updateForType(this.props.types[this.props.type]);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type) {
            this.setState({spec: []});
            this.updateForType(nextProps.types[nextProps.type]);
        }
    }

    updateForType(type) {
        let path = type.endpoint + type.specPath;
        this.fetchSpec(path);
    }

    fetchSpec(path) {
        fetch(path)
            .then(checkStatus)
            .then(parseJSON)
            .then(this.setSpec.bind(this))
            .then(this.submitOnLoad.bind(this));
    }

    setSpec(data) {
        this.setState({spec: data['paths'][this.props.types[this.props.type].queryPath]['get']['parameters']});
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
        const paramInSpec = this.state.spec.find(parameter => parameter['name'] === name);
        const restrictedInputParams = this.props.types[this.props.type].restrictInput;
        const paramNotRestricted = restrictedInputParams ? restrictedInputParams.indexOf(name) !== -1 : true;
        return paramNotRestricted && paramInSpec;
    }

    render() {
        let parameters = [];
        let searchBar = [];
        parameters.push(<TypeSelector key="type-selector" types={this.props.types} type={this.props.type}
                                      onSetType={this.props.onSetType}/>);
        if (this.hasParameter('source')) {
            parameters.push(<LanguageSelector key="source" value={this.state.values.source} name="selector-source"
                                              onSelect={this.setSource.bind(this)}/>);
        }
        if (this.hasParameter('target')) {
            parameters.push(<LanguageSelector key="target" value={this.state.values.target} name="selector-target"
                                              onSelect={this.setTarget.bind(this)}/>);
        }
        if (this.hasParameter('seed')) {
            searchBar.push(
                <Search
                    key="seed"
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
