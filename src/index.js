import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.css';

window.jQuery =require('jquery');
window.$ = require('jquery');
require('jquery.i18n/src/jquery.i18n');
require('jquery.i18n/src/jquery.i18n.messagestore');
require('jquery.i18n/src/jquery.i18n.fallbacks');
require('jquery.i18n/src/jquery.i18n.parser');
require('jquery.i18n/src/jquery.i18n.emitter');
require('jquery.i18n/src/jquery.i18n.language');

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
