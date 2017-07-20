export const isSrcDocSupported = document.createElement('iframe').srcdoc !== undefined;

export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        return response.json().then(Promise.reject.bind(Promise));
    }
}

export function parseJSON(response) {
    return response.json();
}

export function encodeParams(params) {
    let encodedParams = [];
    for (const key of Object.keys(params)) {
        if (params[key]) {
            encodedParams.push(key + '=' + encodeURIComponent(params[key]));
        }
    }
    return encodedParams.join('&');
}
