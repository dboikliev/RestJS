# RestJS

A simple rest client implemented in JavaScript.

## Examples

#### 1. Simple request:

```javascript
rest("http://localhost")
  .get()
  .then(success => console.log(success), error => console.log(error));
```

#### 2. Request with parameters:

```javascript
rest("http://localhost")
  .query({ param: "value" })
  .get()
  .then(success => console.log(success), error => console.log(error));
```

#### Result:

```
GET "http://localhost/?param=value"
```

#### 3. Sending additional headers with the request:

```javascript
rest("http://localhost")
  .headers({ "my-special-snowflake-header": "very important stuff" })
  .query({ param: "value" })
  .get()
  .then(success => console.log(success), error => console.log(error));
```

#### 4. Named routes:

```javascript
let client = rest("http://localhost/api")
    .route("test", "/users/{userId}/offices/{officeId}")
    .route("bla", "/bla/{txt}");

client.routes.test
    .parameters({ userId: 10, officeId: 20 })
    .query({ bla: 10 })
    .post();

client.routes.bla
    .parameters({ txt: "some txt" })
    .get();
```

#### Result:

```
POST "http://localhost/api/users/10/offices/20?bla=10"
GET "http://localhost/api/bla/some%20txt"
```
