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

initialize();

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
