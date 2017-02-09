import React from 'react';
import {I18nProvider} from './I18n';
import Disclaimer from './Disclaimer';
import Title from './Title';
import TypeSelector from './TypeSelector';
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
                    spec: '/spec',
                    queryPath: '/v1/articles'
                },
                related_articles: {
                    appTitle: 'title-readmore',
                    i18nKey: 'title-related-articles',
                    endpoint: 'https://recommend-related-articles.wmflabs.org/types/related_articles',
                    spec: '/spec',
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
                <TypeSelector types={this.state.types} onSetType={this.setType.bind(this)}
                              defaultType={this.state.recommendationType} />
                <Input />
                <CloseImage className="rt-icon rt-clickable" onClick={this.setLanguage.bind(this)} />
            </I18nProvider>
        )
    }
}

export default App;
