import React from 'react';

class I18n {
    constructor() {
        this.subscriptions = {};
    }

    setLanguage(language) {
        let i = window.jQuery.i18n();
        let data = require('./i18n/' + language + '.json');
        let subscriptions = this.subscriptions;
        i.load(data, language).done(
            function () {
                i.locale = language;
                for (let subscription of Object.keys(subscriptions)) {
                    subscriptions[subscription]();
                }
            }
        );
    }

    subscribe(key, f) {
        this.subscriptions[key] = f;
    }

    unsubscribe(key) {
        delete this.subscriptions[key];
    }
}

export class I18nProvider extends React.Component {
    constructor(p, c) {
        super(p, c);
        this.i18n = new I18n();
        this.i18n.setLanguage(this.props.language);
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
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
        this.context.i18n.subscribe(this, () => this.forceUpdate());
    }

    componentWillUnmount() {
        this.context.i18n.unsubscribe(this);
    }

    getText() {
        return window.jQuery.i18n(this.props.name);
    }

    render() {
        const text = this.getText();
        let attributes = {};
        if (this.props.hasOwnProperty('className')) {
            attributes.className = this.props.className;
        }
        if (this.props.hasOwnProperty('onClick')) {
            attributes.onClick = this.props.onClick;
        }
        return <div {...attributes}>{text}</div>;
    }
}
I18nText.contextTypes = {
    i18n: React.PropTypes.object
};

export class I18nCustom extends React.Component {
    componentDidMount() {
        this.context.i18n.subscribe(this, () => this.forceUpdate());
    }

    componentWillUnmount() {
        this.context.i18n.unsubscribe(this);
    }

    getText() {
        return window.jQuery.i18n(this.props.name);
    }

    render() {
        const CustomTag = `${this.props.tagName}`;
        const text = this.getText();
        let attributes = {};
        if (this.props.hasOwnProperty('className')) {
            attributes.className = this.props.className;
        }
        if (this.props.hasOwnProperty('onClick')) {
            attributes.onClick = this.props.onClick;
        }
        if (this.props.hasOwnProperty('attributeName')) {
            attributes[this.props.attributeName] = text;
            return <CustomTag {...attributes} />;
        }
        return <CustomTag {...attributes}>{text}</CustomTag>;
    }
}
I18nCustom.contextTypes = {
    i18n: React.PropTypes.object
};

export default I18nText;
