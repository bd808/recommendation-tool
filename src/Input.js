import React from 'react';
import 'whatwg-fetch';
import I18nText from './I18n';
import ExpandImage from './images/ExpandImage';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {spec: []};
    }

    componentDidMount() {
        this.fetchSpec(this.props.type.endpoint + this.props.type.specPath);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type !== this.props.type) {
            this.setState({spec: []});
            this.fetchSpec(nextProps.type.endpoint + nextProps.type.specPath);
        }
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
        this.setState({spec: data['paths'][this.props.type.queryPath]['get']['parameters']});
    }

    render() {
        let parameters = [];
        if(this.state.spec.find(parameter => parameter['name'] === 'source')) {
            parameters.push(<div key="source"><I18nText name="selector-source" /><ExpandImage /></div>);
        }
        if(this.state.spec.find(parameter => parameter['name'] === 'target')) {
            parameters.push(<div key="target"><I18nText name="selector-target" /><ExpandImage /></div>);
        }
        if(this.state.spec.find(parameter => parameter['name'] === 'seed')) {
            parameters.push(<div key="seed"><I18nText name="search-placeholder" /><ExpandImage /></div>);
        }
        return (
            <div>
                {parameters}
            </div>
        );
    }
}

export default Input;
