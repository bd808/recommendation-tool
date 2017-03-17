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