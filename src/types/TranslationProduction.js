import React from "react";
import Type from "./Type";
import {encodeParams, checkStatus, parseJSON} from "../util";
import {I18nText} from "../I18n";

class TranslationProduction extends React.Component {
/*
translation2: {
        appTitle: 'title-gapfinder',
        i18nKey: 'title-translation 2',
        version: 'title-alpha',
        endpoint: '',
        specPath: 'https://en.wikipedia.org/api/rest_v1/?spec',
        queryPath: '/data/recommendation/translation/{from_lang}{/seed_article}',
        queryBuilder: (params) => {
            const target = encodeURIComponent(params.target);
            const source = encodeURIComponent(params.source);
            const seed = params.seed ? '/' + encodeURIComponent(params.seed) : '';
            return 'https://' + target + '.wikipedia.org/api/rest_v1/data/recommendation/translation/' + source + seed;
        },
        parseResponse: (response) => {
            return response.items;
        },
        motivation: (item) => {
            return item.sitelink_count + ' sitelinks';
        },
        previewAction: (item, params) => {
            return <I18nText className="rt-button-primary" onClick={() =>
                window.open('https://' + params.source + '.wikipedia.org/wiki/Special:ContentTranslation?'
                    + encodeParams({
                        from: params.source,
                        to: params.target,
                        page: item.title,
                        campaign: 'article-recommender-1'
                    }))} name="modal-translate"/>;
        }
 */
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
        const url = TranslationProduction.buildQuery(params);
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

export default TranslationProduction;
