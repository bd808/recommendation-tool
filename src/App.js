import React from "react";
import "whatwg-fetch";
import {I18nProvider} from "./I18n";
import Disclaimer from "./Disclaimer";
import Title from "./Title";
import Input from "./Input";
import Recommendations from "./Recommendations";

class App extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.state = {
            language: 'en',
            types: {
                /**
                 * Each recommendation type should have an object here
                 * with values describing it of the form:
                 *
                 * <type name>: {
                 *     appTitle: <i18n key (or a raw value) for the app to take when this type is selected>,
                 *     i18nKey: <i18n key for the recommendation type itself>,
                 *     endpoint: <endpoint for the recommendation type>,
                 *     specPath: <path, starting at the endpoint, to get the swagger spec>,
                 *     queryPath: <path, starting at the endpoint, to send requests to get recommendations from>,
                 *     (the following values are optional)
                 *     restrictInput: <Array of values that will be used by Input to generate input fields;
                 *                     only input params that are present in both the spec and this array will
                 *                     be presented to the user>,
                 *     urlParamsBuilder: <function that takes the params generated from Input and can make
                 *                        modifications before they are used to query for recommendations>,
                 *     submitOnLoad: <optional boolean that will submit a query when the type loads if true,
                 *                    but defaults to false>
                 * }
                 *
                 */
                translation: {
                    appTitle: 'title-gapfinder',
                    i18nKey: 'title-translation',
                    endpoint: 'https://recommend.wmflabs.org/types/translation',
                    specPath: '/spec',
                    queryPath: '/v1/articles',
                    urlParamsBuilder: (params) => {
                        if (params.hasOwnProperty('seed')) {
                            params.search = 'related_articles';
                        }
                        return this.encodeParams(params);
                    }
                },
                related_articles: {
                    appTitle: 'title-readmore',
                    i18nKey: 'title-related-articles',
                    endpoint: 'https://recommend-related-articles.wmflabs.org/types/related_articles',
                    specPath: '/spec',
                    queryPath: '/v1/articles'
                },
                missing_sections: {
                    appTitle: 'title-expand',
                    i18nKey: 'title-missing-sections',
                    endpoint: 'https://recommend-missing-sections.wmflabs.org/types/missing_sections',
                    specPath: '/spec',
                    queryPath: '/v1/articles',
                    submitOnLoad: true
                }
            },
            recommendationType: 'missing_sections',
            recommendations: []
        };
    }

    encodeParams(params) {
        let encodedParams = [];
        for (const key of Object.keys(params)) {
            encodedParams.push(key + '=' + encodeURIComponent(params[key]));
        }
        return encodedParams.join('&');
    }

    setLanguage() {
        if (this.state.language === 'en') {
            this.setState({language: 'de'});
        } else {
            this.setState({language: 'en'});
        }
    }

    setType(newType) {
        this.setState({recommendationType: newType, recommendations: []});
    }

    onSubmitInput(values) {
        this.setState({recommendations: []});
        const type = this.state.types[this.state.recommendationType];
        let url = type.endpoint + type.queryPath;
        let encodedParams = type.urlParamsBuilder ? type.urlParamsBuilder(values) : this.encodeParams(values);
        url += '?' + encodedParams;
        fetch(url)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.setRecommendations.bind(this))
            .catch((ex) => this.setState({recommendations: [ex]}));
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return response.json().then(Promise.reject.bind(Promise));
        }
    }

    parseJSON(response) {
        return response.json();
    }

    setRecommendations(results) {
        this.setState({recommendations: results});
    }

    render() {
        return (
            <I18nProvider language={this.state.language}>
                <Disclaimer />
                <Title title={this.state.types[this.state.recommendationType].appTitle}/>
                <Input types={this.state.types} type={this.state.recommendationType} onSetType={this.setType.bind(this)}
                       onSubmit={this.onSubmitInput.bind(this)}/>
                <Recommendations items={this.state.recommendations}/>
            </I18nProvider>
        )
    }
}

export default App;
