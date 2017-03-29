class Request {
    constructor (requestUrl) {
        this.requestUrl = requestUrl;
        this.routes = {};
    }

    route(routeName, relativeUrl) {
        if (routeName) {
            if (relativeUrl) {
                this.routes[routeName] = new Request(this.requestUrl + relativeUrl);
                return this;
            }
            else {
                return this.routes[routeName];
            }
        }
    }

    parameters(requestParameters) {
        this.requestParameters = requestParameters;
        return this;
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

    get() {
        return this._buildRequest("GET");
    }

    post() {
        return this._buildRequest("POST");
    }

    put() {
        return this._buildRequest("PUT");
    }

    delete() {
        return this._buildRequest("DELETE");
    }

    _buildRequest(method) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.onload = resolve;
            xhr.onerror = reject;

            let url = this.requestUrl;
            if (this.requestParameters) {
                url = this.requestUrl.replace(/{(\w+)}/g, (match, submatch) => this.requestParameters[submatch]);
            }

            if (this.requestQuery) {
                let query = Object.keys(this.requestQuery)
                    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.requestQuery[key]))
                    .join("&");

                xhr.open(method, url + "?" + query);
            }
            else {
                xhr.open(method, url);
            }

            this._setXhrHeaders(xhr);

            if (this.requestBody) {
                let form = new FormData();
                Object.keys(this.requestBody)
                    .forEach(key => form.append(key, this.requestBody[key]))
                xhr.send(form);
            }
            else {
                xhr.send();
            }
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

let api = (apiRoot, definitions) => {
    let root = rest(apiRoot);

    let generatedApi = {};

    for (let key in definitions) {
        let definition = definitions[key];
        let method = definition.method;
        let url = definition.url; 
        root.route(key, url);
        
        generatedApi[key] = function (obj) {
            let request = root.routes[key];
            if (obj.parameters) {
                request = request.parameters(obj.parameters);
            }

            if (obj.query) {
                request = request.query(obj.query);
            }

            if (obj.body) {
                request = request.body(obj.body);
            }

            request[method]();
        }
    }       

    return generatedApi;
}