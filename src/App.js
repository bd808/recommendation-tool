import React from 'react';
import 'whatwg-fetch';
import {I18nProvider} from './I18n';
import Disclaimer from './Disclaimer';
import Title from './Title';
import Input from './Input';
import CloseImage from './images/CloseImage';
import Recommendations from './Recommendations';

class App extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.state = {
            language: 'en',
            types: {
                translation: {
                    appTitle: 'title-gapfinder',
                    i18nKey: 'title-translation',
                    endpoint: 'https://recommend.wmflabs.org/types/translation',
                    specPath: '/spec',
                    queryPath: '/v1/articles'
                },
                related_articles: {
                    appTitle: 'title-readmore',
                    i18nKey: 'title-related-articles',
                    endpoint: 'https://recommend-related-articles.wmflabs.org/types/related_articles',
                    specPath: '/spec',
                    queryPath: '/v1/articles'
                }
            },
            recommendationType: 'translation',
            recommendations: []
        };
    }

    setLanguage() {
        if(this.state.language === 'en'){
            this.setState({language: 'de'});
        }else{
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
        let joiner = '?';
        for (const key of Object.keys(values)) {
            url += joiner + key + '=' + encodeURIComponent(values[key]);
            joiner = '&';
        }
        fetch(url)
            .then(this.checkStatus)
            .then(this.parseJSON)
            .then(this.setRecommendations.bind(this))
            .catch((ex) => this.setState({recommendations: [ex]}));
    }

    checkStatus(response) {
        if(response.status >= 200 && response.status < 300) {
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
                <Title title={this.state.types[this.state.recommendationType].appTitle} />
                <Input types={this.state.types} type={this.state.recommendationType} onSetType={this.setType.bind(this)} onSubmit={this.onSubmitInput.bind(this)} />
                <CloseImage className="rt-icon rt-clickable" onClick={this.setLanguage.bind(this)} />
                <Recommendations items={this.state.recommendations} />
            </I18nProvider>
        )
    }
}

export default App;
