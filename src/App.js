import React from 'react';
import {I18nProvider} from './I18n';
import Disclaimer from './Disclaimer';
import Title from './Title';

class App extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.state = {language: 'en'};
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
                    <Title title="GapFinder" />
                </I18nProvider>
                <div className="gf-icon gf-icon-close gf-clickable" onClick={this.setLanguage.bind(this)}></div>
            </div>
        )
    }
}

export default App;
