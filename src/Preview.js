import React from "react";
import "react-modal";
import "whatwg-fetch";
import {checkStatus, parseJSON, encodeParams, isSrcDocSupported} from "./util";
import CloseImage from "./images/CloseImage";
import NextImage from "./images/NextImage";
import PreviousImage from "./images/PreviousImage";
import I18nText from "./I18n";
import "./Preview.css";

class Preview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            previewHtml: ''
        };
    }

    componentDidMount() {
        this.setState({previewHtml: (
            <pre>
                {JSON.stringify(this.props.item, null, 2)}
            </pre>
        )});
        this.show(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.props.index) {
            this.setState({previewHtml: (
                <pre>
                    {JSON.stringify(nextProps.item, null, 2)}
                </pre>
            )});
            this.show(nextProps);
        }
    }

    show(props) {
        const previewUrl = 'https://' + props.source + '.wikipedia.org/w/api.php?' + encodeParams({
                action: 'parse',
                format: 'json',
                origin: '*',
                disableeditsection: 1,
                prop: 'text|headhtml',
                page: props.item.title
            });

        fetch(previewUrl)
            .then(checkStatus)
            .then(parseJSON)
            .then(this.validateParseResponse.bind(this))
            .then(this.buildPreviewHtml.bind(this))
            .then(this.setPreviewHtml.bind(this))
            .catch(this.setPreviewFailed.bind(this));
    }

    validateParseResponse(data) {
        if (!data.hasOwnProperty('parse')
            || !data['parse'].hasOwnProperty('text')
            || !data['parse']['text'].hasOwnProperty('*')
            || !data['parse'].hasOwnProperty('headhtml')
            || !data['parse']['headhtml'].hasOwnProperty('*')
            || !data['parse'].hasOwnProperty('title'))
        {
            return Promise.reject.bind(Promise);
        } else {
            return data;
        }
    }

    buildPreviewHtml(data) {
        let baseUrl = 'https://' + this.props.source + '.wikipedia.org/wiki/' + encodeURIComponent(data['parse']['title']);
        let parser = new DOMParser();
        let html = parser.parseFromString(data['parse']['headhtml']['*'], 'text/html');
        html.getElementsByTagName('head')[0].insertAdjacentHTML('afterbegin', '<base href="' + baseUrl + '">');
        html.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', '<style type="text/css">body {background-color: unset;}</style>');
        html.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin', data['parse']['text']['*']);
        let wrap = document.createElement('div');
        wrap.appendChild(html.documentElement);
        return wrap.innerHTML;
    }

    setPreviewHtml(value) {
        let result = '';
        if (!isSrcDocSupported) {
            // This is needed to get the iframe content to load in IE, since srcdoc isn't supported yet
            // Found at github.com/jugglinmike/srcdoc-polyfill
            // iframe.contentWindow.location = jsUrl;
            result = (
                // eslint-disable-next-line
                <iframe className="Preview-iframe" srcDoc={value} src="javascript: window.frameElement.getAttribute('srcdoc');"></iframe>
            );
        } else {
            result = (
                <iframe className="Preview-iframe" srcDoc={value}></iframe>
            );
        }

        this.setState({previewHtml: result}, this.forceUpdate.bind(this));
    }

    setPreviewFailed() {
        this.setState({previewHtml: <I18nText name="modal-preview-fail"/>});
    }

    next() {
        if (this.props.index < this.props.length - 1) {
            this.props.changeIndex(this.props.index + 1);
        }
    }

    previous() {
        if (this.props.index > 0) {
            this.props.changeIndex(this.props.index - 1);
        }
    }
    
    close() {
        this.props.changeIndex(-1);
    }

    render() {
        return (
            <div className="Preview">
                <div className="Preview-header">
                    <div className="Preview-title">
                        {this.props.item.title.replace(/_/g, ' ')}
                    </div>
                    <CloseImage className="Preview-button" onClick={this.close.bind(this)}/>
                </div>
                <div className="Preview-body">
                    {this.state.previewHtml}
                </div>
                <div className="Preview-footer">
                    <div className="Preview-footer-left">
                        <PreviousImage className="Preview-button" onClick={this.previous.bind(this)}/>
                        <NextImage className="Preview-button" onClick={this.next.bind(this)}/>
                    </div>
                    <div className="Preview-footer-right">
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;