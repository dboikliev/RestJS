function rest(url) {
    return new Request(url);
}

class Request { 
    constructor (requestUrl) {
        this.requestUrl = requestUrl;
    }

    headers(requestHeaders) {
        this.requestHeaders = requestHeaders;
        return this;
    }

    data(requestData) {
        this.requestData = requestData;
        return this;
    }

    get(data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            let query = Object.keys(data)
                .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                .join('&');
            xhr.open('GET', this.requestUrl + "?" + query);
            this._setXhrHeaders(xhr);
            
            xhr.send();
        });
    }

    post(data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            xhr.open('POST', this.requestUrl);
            this._setXhrHeaders(xhr);

            let form = new FormData();
            Object.keys(data)
                .forEach(key => form.append(key, data[key]))
            xhr.send(form);
        });
    }

    _setXhrHeaders(xhr) {
        if (this.requestHeaders) {
            Object.keys(this.requestHeaders).forEach(key => xhr.setRequestHeader(key, this.requestHeaders[key]));
        }
    }
}