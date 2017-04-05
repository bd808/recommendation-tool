import React from "react";

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

    i18n(name) {
        return window.jQuery.i18n(name);
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
        if (this.mounted) {
            this.i18n.setLanguage(next.language);
        }
    }

    getChildContext() {
        return {i18n: this.i18n};
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}
I18nProvider.childContextTypes = {
    i18n: React.PropTypes.object
};

export class I18nText extends React.Component {
    render() {
        return <I18nCustom {...this.props}/>;
    }
}
I18nText.propTypes = {
    name: React.PropTypes.string.isRequired
};

export class I18nCustom extends React.Component {
    componentDidMount() {
        this.context.i18n.subscribe(this, () => this.forceUpdate());
    }

    componentWillUnmount() {
        this.context.i18n.unsubscribe(this);
    }

    render() {
        let {name, tagName, attributeName, ...props} = this.props;
        const CustomTag = `${tagName}`;
        const text = this.context.i18n.i18n(name);

        if (attributeName !== undefined) {
            props[attributeName] = text;
            return <CustomTag {...props}/>;
        }
        return <CustomTag {...props}>{text}</CustomTag>;
    }
}
I18nCustom.propTypes = {
    name: React.PropTypes.string.isRequired,
    tagName: React.PropTypes.string.isRequired,
    attributeName: React.PropTypes.string
};
I18nCustom.defaultProps = {
    tagName: 'div'
};
I18nCustom.contextTypes = {
    i18n: React.PropTypes.object
};

export default I18nText;
