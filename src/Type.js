import React from "react";
import "whatwg-fetch";
import {I18nText} from "./I18n";
import CustomMenu from "./CustomMenu";
import {encodeParams} from './util';
import "./Modal.css";
import "./style.css";

/**
 * Each recommendation type should have an object here
 * with values describing it of the form:
 *
 * <type name>: {
 *     appTitle: <i18n key (or a raw value) for the app to take when this type is selected>,
 *     i18nKey: <i18n key for the recommendation type itself>,
 *     version: <i18n key for the version>,
 *     endpoint: <endpoint for the recommendation type>,
 *     specPath: <path, starting at the endpoint, to get the swagger spec>,
 *     queryPath: <query path in swagger spec used to identify endpoint>,
 *     motivation: <function that takes an item and returns a motivation value to be placed in
 *                  the footer of the recommendation card>,
 *     previewAction: <function that takes an item and params and returns a button to be placed
 *                     in the lower right of the preview>,
 *
 *
 *     ******** the following values are optional ********
 *
 *     restrictInput: <Array of values that will be used by Input to generate input fields;
 *                     only input params that are present in both the spec and this array will
 *                     be presented to the user>,
 *     urlParamsBuilder: <function that takes the params generated from Input and can make
 *                        modifications before they are used to query for recommendations>,
 *     submitOnLoad: <boolean that will submit a query when the type loads if true,
 *                    but defaults to false>,
 *     getPreviewSidebar: <function that returns a sidebar to place next to the article preview>,
 *     languages: <list of language codes to restrict the source and target inputs to>,
 *     queryBuilder: <function that takes the params generated from Input and builds the query
 *                    path to be appended to the endpoint for making requests>,
 *     parseResponse: <function that takes the response from the endpoint and returns an array
 *                     of recommendations>,
 * }
 *
 */

export const TYPES = {
    translation: {
        appTitle: 'title-gapfinder',
        i18nKey: 'title-translation',
        version: 'title-alpha',
        endpoint: 'https://recommend.wmflabs.org/types/translation',
        specPath: '/spec',
        queryPath: '/v1/articles',
        urlParamsBuilder: (params) => {
            if (params.hasOwnProperty('seed')) {
                params.search = 'related_articles';
            }
            return encodeParams(params);
        },
        motivation: (item) => {
            return item.pageviews + ' recent views';
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
    },
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
    },
    missing_sections: {
        appTitle: 'title-gapfinder',
        i18nKey: 'title-missing-sections',
        version: 'title-alpha',
        endpoint: 'https://recommend-missing-sections.wmflabs.org/types/missing_sections',
        specPath: '/spec',
        queryPath: '/v1/articles',
        submitOnLoad: true,
        motivation: (item) => {
            return item.sections.length + ' sections to add';
        },
        previewAction: () => '',
        getPreviewSidebar: (item) => {
            let sidebarItems = [];
            sidebarItems.push({
                label: "title-add-sections",
                value: '',
                header: true
            });
            for (const section of item.sections) {
                const friendlyName = section.charAt(0) + section.slice(1).toLowerCase();
                const url = "https://en.wikipedia.org/w/index.php?" + encodeParams({
                        title: item.title,
                        action: 'edit',
                        section: 'new',
                        preloadtitle: friendlyName
                    });
                sidebarItems.push({
                    label: friendlyName,
                    value: url
                });
            }
            return <CustomMenu
                className="Preview-sidebar"
                items={sidebarItems}
                onSelect={(value) => window.open(value)}
            />;
        }
    },
    related_articles: {
        appTitle: 'title-readmore',
        i18nKey: 'title-related-articles',
        version: 'title-alpha',
        endpoint: 'https://recommend-related-articles.wmflabs.org/types/related_articles',
        specPath: '/spec',
        queryPath: '/v1/articles',
        motivation: () => '',
        previewAction: () => ''
    },
    translation_test: {
        appTitle: 'title-gapfinder',
        i18nKey: 'translation test',
        version: 'development test',
        endpoint: 'https://recommend-experimental.wmflabs.org/types/translation_test',
        specPath: '/spec',
        queryPath: '/v1/items',
        motivation: (item) => {
            return 'Prediction: ' + item.prediction;
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
        },
        languages: [
            'aa', 'ab', 'ace', 'ady', 'af', 'ak', 'als', 'am', 'ang', 'an', 'arc', 'ar', 'arz', 'ast', 'as', 'av', 'ay',
            'azb', 'az', 'bar', 'ba', 'bcl', 'be', 'bg', 'bh', 'bi', 'bjn', 'bm', 'bn', 'bo', 'bpy', 'br', 'bs', 'bug',
            'bxr', 'ca', 'cdo', 'ceb', 'ce', 'cho', 'chr', 'ch', 'chy', 'ckb', 'co', 'crh', 'cr', 'csb', 'cs', 'cu',
            'cv', 'cy', 'da', 'de', 'diq', 'dsb', 'dty', 'dv', 'dz', 'ee', 'el', 'eml', 'en', 'eo', 'es', 'et', 'eu',
            'ext', 'fa', 'ff', 'fi', 'fj', 'fo', 'frp', 'frr', 'fr', 'fur', 'fy', 'gag', 'gan', 'ga', 'gd', 'glk', 'gl',
            'gn', 'gom', 'got', 'gu', 'gv', 'hak', 'ha', 'haw', 'he', 'hif', 'hi', 'ho', 'hr', 'hsb', 'ht', 'hu', 'hy',
            'hz', 'ia', 'id', 'ie', 'ig', 'ii', 'ik', 'ilo', 'io', 'is', 'it', 'iu', 'jam', 'ja', 'jbo', 'jv', 'kaa',
            'kab', 'ka', 'kbd', 'kg', 'ki', 'kj', 'kk', 'kl', 'km', 'kn', 'koi', 'ko', 'krc', 'kr', 'ksh', 'ks', 'ku',
            'kv', 'kw', 'ky', 'lad', 'la', 'lbe', 'lb', 'lez', 'lg', 'lij', 'li', 'lmo', 'ln', 'lo', 'lrc', 'ltg', 'lt',
            'lv', 'mai', 'mdf', 'mg', 'mhr', 'mh', 'min', 'mi', 'mk', 'ml', 'mn', 'mo', 'mrj', 'mr', 'ms', 'mt', 'mus',
            'mwl', 'myv', 'my', 'mzn', 'nah', 'nap', 'na', 'nds', 'ne', 'new', 'ng', 'nl', 'nn', 'nov', 'no', 'nrm',
            'nso', 'nv', 'ny', 'oc', 'olo', 'om', 'or', 'os', 'pag', 'pam', 'pap', 'pa', 'pcd', 'pdc', 'pfl', 'pih',
            'pi', 'pl', 'pms', 'pnb', 'pnt', 'ps', 'pt', 'qu', 'rm', 'rmy', 'rn', 'ro', 'rue', 'ru', 'rw', 'sah', 'sa',
            'scn', 'sco', 'sc', 'sd', 'se', 'sg', 'sh', 'simple', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'srn', 'sr',
            'ss', 'stq', 'st', 'su', 'sv', 'sw', 'szl', 'ta', 'tcy', 'tet', 'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn',
            'to', 'tpi', 'tr', 'ts', 'tt', 'tum', 'tw', 'tyv', 'ty', 'udm', 'ug', 'uk', 'ur', 'uz', 'vec', 'vep', 've',
            'vi', 'vls', 'vo', 'war', 'wa', 'wo', 'wuu', 'xal', 'xh', 'xmf', 'yi', 'yo', 'za', 'zea', 'zh', 'zuwiki'
        ]
    }
};
