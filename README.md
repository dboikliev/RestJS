# RestJS

A simple rest client implemented in JavaScript.

##Examples

####1. Simple request:

```javascript
rest("http://localhost")
  .get()
  .then(success => console.log(success), error => console.log(error));
```

####2. Request with parameters:

```javascript
rest("http://localhost")
  .get({ param: "value" })
  .then(success => console.log(success), error => console.log(error));
```

####Result:

GET request sent to:
```
http://localhost/?param=value
```

####3. Sending additional headers with the request:

```javascript
rest("http://localhost")
  .headers({ "my-special-snowflake-header": "very important stuff" })
  .get({ param: "value" })
  .then(success => console.log(success), error => console.log(error));
```
