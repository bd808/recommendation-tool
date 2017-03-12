import 'whatwg-fetch';

export const languageToDomainMapping = {
    "be-tarask": "be-x-old",
    "bho": "bh",
    "crh-latn": "crh",
    "gsw": "als",
    "lzh": "zh-classical",
    "nan": "zh-min-nan",
    "nb": "no",
    "rup": "roa-rup",
    "sgs": "bat-smg",
    "vro": "fiu-vro",
    "yue": "zh-yue"
};

let languagePairs = null;

export function getSources() {
    return languagePairs['source'];
}

export function initialize() {
    if (!languagePairs) {
        fetchPairs();
    }
}

function fetchPairs() {
    fetch('https://cxserver.wikimedia.org/v1/languagepairs')
        .then(checkStatus)
        .then(parseJSON)
        .then(setPairs);
}

function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}

function setPairs(data) {
    languagePairs = data;
}
