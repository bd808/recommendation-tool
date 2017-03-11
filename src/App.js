import React from 'react';
import {I18nProvider} from './I18n';
import Disclaimer from './Disclaimer';
import Title from './Title';
import Input from './Input';
import CloseImage from './images/CloseImage';

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
            recommendationType: 'translation'
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
        this.setState({recommendationType: newType});
    }

    render() {
        return (
            <I18nProvider language={this.state.language}>
                <Disclaimer />
                <Title title={this.state.types[this.state.recommendationType].appTitle} />
                <Input types={this.state.types} type={this.state.recommendationType} onSetType={this.setType.bind(this)} />
                <CloseImage className="rt-icon rt-clickable" onClick={this.setLanguage.bind(this)} />
            </I18nProvider>
        )
    }
}

export default App;
