import React from 'react';
import 'whatwg-fetch';
import TypeSelector from './TypeSelector';
import LanguageSelector from './LanguageSelector';
import {I18nCustom} from './I18n';
import SearchImage from './images/SearchImage';
import './Input.css';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {spec: [], values: {}};
    }

    componentDidMount() {
        this.updateForType(this.props.types[this.props.type]);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type !== this.props.type) {
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
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.setSpec.bind(this));
    }

    checkStatus(response) {
        if(response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }

    parseJSON(response) {
        return response.json();
    }

    setSpec(data) {
        this.setState({spec: data['paths'][this.props.types[this.props.type].queryPath]['get']['parameters']});
    }

    setSource(language) {
        this.setValueAndSubmit('source', language);
    }

    setTarget(language) {
        this.setValueAndSubmit('target', language);
    }

    setSeed(event) {
        this.setValue('seed', event.target.value);
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
        this.props.onSubmit(this.state.values);
    }

    render() {
        let parameters = [];
        let searchBar = [];
        parameters.push(<TypeSelector key="type-selector" types={this.props.types} type={this.props.type} onSetType={this.props.onSetType} />);
        if(this.state.spec.find(parameter => parameter['name'] === 'source')) {
            parameters.push(<LanguageSelector key="source" name="selector-source" onSelect={this.setSource.bind(this)} />);
        }
        if(this.state.spec.find(parameter => parameter['name'] === 'target')) {
            parameters.push(<LanguageSelector key="target" name="selector-target" onSelect={this.setTarget.bind(this)} />);
        }
        if(this.state.spec.find(parameter => parameter['name'] === 'seed')) {
            searchBar.push(<div key="seed" className="Input-search-container">
                    <SearchImage className="Input-search-icon" />
                    <I18nCustom onChange={this.setSeed.bind(this)} tagName="input" name="search-placeholder"
                                attributeName="placeholder" className="Input-search" />
            </div>);
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
