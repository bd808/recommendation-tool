import React from 'react';

class I18n {
    constructor(language) {
        this.language = language;
        this.subscriptions = [];
    }

    setLanguage(language) {
        this.language = language;

        let i = window.jQuery.i18n();
        let data = require('./i18n/' + this.language + '.json');
        let subscriptions = this.subscriptions;
        i.load(data, this.language).done(
            function () {
                i.locale = language;
                subscriptions.forEach(f => f());
            }
        );
    }

    subscribe(f) {
        this.subscriptions.push(f);
    }
}

export class I18nProvider extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.i18n = new I18n(this.props.language);
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this.componentWillReceiveProps({language: 'en'})
    }

    componentWillReceiveProps(next) {
        if(this.mounted) {
            this.i18n.setLanguage(next.language);
        }
    }

    getChildContext() {
        return {i18n: this.i18n};
    }

    render () {
        return <div>{this.props.children}</div>
    }
}
I18nProvider.childContextTypes = {
    i18n: React.PropTypes.object
};

export class I18nText extends React.Component {
    componentDidMount() {
        this.context.i18n.subscribe(() => this.forceUpdate());
    }

    render() {
        const text = window.jQuery.i18n(this.props.name);
        return <div>{text}</div>;
    }
}
I18nText.contextTypes = {
    i18n: React.PropTypes.object
};
