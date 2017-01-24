class Request { 
    constructor (requestUrl) {
        this.requestUrl = requestUrl;
    }

    headers(requestHeaders) {
        this.requestHeaders = requestHeaders;
        return this;
    }

    body(requestBody) {
        this.requestBody = requestBody;
        return this;
    }

    query(requestQuery) {
        this.requestQuery = requestQuery;
        return this;
    }

    get(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            let query = Object.keys(this.requestQuery)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.requestQuery[key]))
                .join("&");

            xhr.open("GET", this.requestUrl + "?" + query);
            this._setXhrHeaders( xhr );

            xhr.send();
        });
    }

    post() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            xhr.open("POST", this.requestUrl);
            this._setXhrHeaders(xhr);

            let form = new FormData();
            Object.keys(this.requestBody)
                .forEach(key => form.append(key, this.requestBody[key]))
            xhr.send(form);
        });
    }

    put() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            xhr.open("PUT", this.requestUrl);
            this._setXhrHeaders(xhr);

            let form = new FormData();
            Object.keys(this.requestBody)
                .forEach(key => form.append(key, this.requestBody[key]))
            xhr.send(form);
        });
    }

    delete(){
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            let query = Object.keys(this.requestQuery)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.requestBody[key]))
                .join("&");

            xhr.open("DELETE", this.requestUrl + "?" + query);
            this._setXhrHeaders( xhr );

            xhr.send();
        });
    }

    _setXhrHeaders(xhr) {
        if (this.requestHeaders) {
            Object.keys(this.requestHeaders).forEach(key => xhr.setRequestHeader(key, this.requestHeaders[key]));
        }
    }
}

function rest(url) {
    return new Request(url);
}
