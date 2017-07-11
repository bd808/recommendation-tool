import React from "react";
import "react-modal";
import "whatwg-fetch";
import {checkStatus, encodeParams, isSrcDocSupported, parseJSON} from "./util";
import WikidataImage from "./images/WikidataImage";
import NewWindowImage from "./images/NewWindowImage";
import CloseImage from "./images/CloseImage";
import NextImage from "./images/NextImage";
import PreviousImage from "./images/PreviousImage";
import I18nText from "./I18n";
import "./Preview.css";

class Preview extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            previewHtml: 'Loading...'
        };
    }

    componentDidMount() {
        this.show(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.index !== this.props.index) {
            this.setState({previewHtml: 'Loading...'});
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
            || !data['parse'].hasOwnProperty('title')) {
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
        html.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', '<style type="text/css">body {background-color: unset; padding: .5rem;}</style>');
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
                <iframe className="Preview-iframe" srcDoc={value}
                        src="javascript: window.frameElement.getAttribute('srcdoc');"></iframe>
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
        let sidebar = '';
        if (this.props.type.hasOwnProperty('getPreviewSidebar')) {
            sidebar = this.props.type.getPreviewSidebar(this.props.item);
        }
        let articleUrl = 'https://' + this.props.source + '.wikipedia.org/wiki/'
            + encodeURIComponent(this.props.item.title);
        let wikidataId = '';
        if (this.props.item.hasOwnProperty('id')) {
            wikidataId = this.props.item.id;
        } else if (this.props.item.hasOwnProperty('wikidata_id')) {
            wikidataId = this.props.item.wikidata_id;
        }
        let wikidataButton = null;
        if (wikidataId) {
            wikidataButton =
                <div className="Preview-button"
                     onClick={() => window.open("https://www.wikidata.org/wiki/" + wikidataId)}>
                    <WikidataImage/>
                </div>
        }
        return (
            <div className="Preview">
                <div className="Preview-header">
                    <div className="Preview-title">
                        {this.props.item.title.replace(/_/g, ' ')}
                    </div>
                    {wikidataButton}
                    <div className="Preview-button" onClick={() => window.open(articleUrl)}>
                        <NewWindowImage/>
                    </div>
                    <div className="Preview-button-close" onClick={this.close.bind(this)}>
                        <CloseImage/>
                    </div>
                </div>
                <div className="Preview-body">
                    <div className="Preview-iframe-container">
                        {this.state.previewHtml}
                    </div>
                    {sidebar}
                </div>
                <div className="Preview-footer">
                    <div className="Preview-footer-left">
                        <div className={this.props.index < 1 ? "Preview-button-disabled" : "Preview-button"}
                             onClick={this.previous.bind(this)}>
                            <PreviousImage/>
                        </div>
                        <div
                            className={this.props.index < this.props.length - 1 ? "Preview-button" : "Preview-button-disabled"}
                            onClick={this.next.bind(this)}>
                            <NextImage/>
                        </div>
                    </div>
                    <div className="Preview-footer-right">
                    </div>
                </div>
            </div>
        );
    }
}

export default Preview;