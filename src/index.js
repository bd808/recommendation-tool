import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';
import {initialize} from './LanguagePairs';

window.jQuery =require('jquery');
window.$ = require('jquery');

require('jquery.i18n/src/jquery.i18n');
require('jquery.i18n/src/jquery.i18n.messagestore');
require('jquery.i18n/src/jquery.i18n.fallbacks');
require('jquery.i18n/src/jquery.i18n.parser');
require('jquery.i18n/src/jquery.i18n.emitter');
require('jquery.i18n/src/jquery.i18n.language');

require('jquery.uls/src/jquery.uls.data.js');
require('jquery.uls/src/jquery.uls.data.utils.js');

// TODO: instead of having this awkward callback, this should be
// TODO: changed to utilize component state, otherwise the spec
// TODO: request won't initiate until after the language pairs
// TODO: request resolves
initialize(() => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
});


