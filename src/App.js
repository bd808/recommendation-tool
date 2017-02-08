import React from 'react';
import {I18nProvider} from './I18n';
import Disclaimer from './Disclaimer';
import Title from './Title';
import TypeSelector from './TypeSelector';
import Input from './Input';

class App extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.state = {
            language: 'en',
            types: {
                translation: {
                    i18nKey: 'title-translation',
                    endpoint: 'https://recommend.wmflabs.org/types/translation',
                    spec: '/spec',
                    queryPath: '/v1/articles'
                },
                related_articles: {
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

    render() {
        return (
            <div>
                <I18nProvider language={this.state.language}>
                    <Disclaimer />
                    <Title title="title-gapfinder" />
                    <TypeSelector types={this.state.types} defaultType="translation" />
                    <Input />
                </I18nProvider>
                <div className="gf-icon gf-icon-close gf-clickable" onClick={this.setLanguage.bind(this)}></div>
            </div>
        )
    }
}

export default App;
