import React from "react";
import "whatwg-fetch";
import queryString from "query-string";
import Modal from "react-modal";
import {I18nText} from "../I18n";
import Title from "../Title";
import Input from "../Input";
import Recommendations from "../Recommendations";
import StatusMessage from "../StatusMessage";
import Preview from "../Preview";
import "../Modal.css";
import "../style.css";
import {encodeParams} from "../util";

class Type extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.state = {
            recommendations: [],
            previewIndex: -1,
            recommendationsSourceLanguage: 'en',
            recommendationParams: {},
            error: undefined,
            loading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.type !== nextProps.match.params.type) {
            this.resetResult();
        }
    }

    resetResult() {
        this.setState({
            recommendations: [],
            recommendationParams: {},
            previewIndex: -1,
            error: undefined,
            loading: false
        });
    }

    hasRequiredParams(values) {
        return this.props.params.required.reduce((hasEverything, paramName) => {
            return hasEverything && values.hasOwnProperty(paramName);
        }, true);
    }

    onSubmitInput(values) {
        if (this.hasRequiredParams(values)) {
            this.props.history.push({
                    pathname: this.props.location.path,
                    search: encodeParams(values)
            });
            this.resetResult();
            this.setState({
                recommendationsSourceLanguage: values.hasOwnProperty('source') ? values.source : 'en',
                recommendationParams: values,
                loading: true
            });
            this.props.query(values)
            .then(this.setRecommendations.bind(this))
            .catch((ex) => this.setState({error: ex, loading: false}));
        } else {
            this.setState({error: 'Missing one or more required parameters', loading: false})
        }
    }

    setRecommendations(results) {
        if (this.state.loading === true) {
            this.setState({recommendations: results, loading: false});
        }
    }

    showPreview(index) {
        this.setState({previewIndex: index});
    }

    render() {
        let parameters = queryString.parse(this.props.location.search);
        let result = '';
        if (this.state.loading === true) {
            result = <StatusMessage><I18nText name="status-preparing"/></StatusMessage>;
        } else if (this.state.error !== undefined) {
            result = <StatusMessage>{JSON.stringify(this.state.error)}</StatusMessage>;
        } else {
            result = (
                <div>
                    <Recommendations
                        items={this.state.recommendations}
                        source={this.state.recommendationsSourceLanguage}
                        motivation={this.props.motivation}
                        showPreview={this.showPreview.bind(this)}
                    />
                    <Modal
                        isOpen={this.state.previewIndex >= 0}
                        onRequestClose={this.showPreview.bind(this, -1)}
                        contentLabel=""
                        className="Modal"
                    >
                        <Preview
                            item={this.state.recommendations[this.state.previewIndex]}
                            index={this.state.previewIndex}
                            length={this.state.recommendations.length}
                            source={this.state.recommendationsSourceLanguage}
                            params={this.state.recommendationParams}
                            changeIndex={this.showPreview.bind(this)}
                        />
                    </Modal>
                </div>
            );
        }
        return (
            <div>
                <Title
                    title={this.props.title}
                    version={this.props.version}
                />
                <Input
                    params={this.props.params.required.concat(this.props.params.optional)}
                    queryParams={parameters}
                    onSubmit={this.onSubmitInput.bind(this)}
                />
                {result}
            </div>
        )
    }
}

export default Type;
