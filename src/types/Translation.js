import React from "react";
import Type from "./Type";
import {encodeParams, checkStatus, parseJSON} from "../util";
import {I18nText} from "../I18n";

class Translation extends React.Component {

    static buildQuery(params) {
        const endpoint = 'https://recommend.wmflabs.org/types/translation';
        const queryPath = '/v1/articles';
        let url = endpoint + queryPath;
        if (params.hasOwnProperty('seed')) {
            params.search = 'related_articles';
        }
        const encodedParams = encodeParams(params);
        if (encodedParams) {
            url += '?' + encodedParams;
        }
        return url;
    }

    static query(params) {
        const url = Translation.buildQuery(params);
        return fetch(url)
        .then(checkStatus)
        .then(parseJSON)
    }

    static motivation(item) {
        return item.pageviews + ' recent views';
    }

    static previewAction(item, params) {
        return <I18nText className="rt-button-primary" onClick={() =>
            window.open('https://' + params.source + '.wikipedia.org/wiki/Special:ContentTranslation?'
                + encodeParams({
                    from: params.source,
                    to: params.target,
                    page: item.title,
                    campaign: 'article-recommender-1'
                }))} name="modal-translate"/>;
    }

    render() {
        return (
            <Type
                title="title-gapfinder"
                version="title-alpha"
                name="title-translation"
                params={{
                    required: ['source', 'target'],
                    optional: ['seed']
                }}
                query={Translation.query}
                motivation={Translation.motivation}
                previewAction={Translation.previewAction}
                {...this.props}
            />
        );
    }
}

export default Translation;
