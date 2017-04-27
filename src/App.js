import React from "react";
import "whatwg-fetch";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import {I18nProvider} from "./I18n";
import Disclaimer from "./Disclaimer";
import Type from "./Type";
import "./Modal.css";

class App extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.state = {
            language: 'en',
        };
    }

    setLanguage(language) {
        this.setState({language: language});
    }

    render() {
        return (
            <I18nProvider language={this.state.language}>
                <Disclaimer />
                <BrowserRouter>
                    <div>
                        <Route exact={true} path="/" render={() => (
                            <Redirect to="/missing_sections"/>
                        )}/>
                        <Route path="/:type" component={Type}/>
                    </div>
                </BrowserRouter>
            </I18nProvider>
        )
    }
}

export default App;
