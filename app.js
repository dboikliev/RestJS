requirejs.config({
    baseUrl: "src/"
});

require(["client"], () => {
    //defining routes
    var client = rest("http://localhost/api")
        .route("test", "/users/{userId}/offices/{officeId}")
        .route("bla", "/bla/{txt}");

    client.routes.test
        .parameters({ userId: 10, officeId: 20 })
        .query({ bla: 10 })
        .get();

    client.routes.bla
        .parameters({ txt: "some txt" })
        .get();

    //defining an api        
    var usersApi = api("http://localhost/api", {
        getUser: {
            method: "get",
            url: "/users/{userId}"
        },
        createUser: {
            method: "post",
            url: "/users"
        }
    });

    usersApi.getUser({ parameters: { userId: 10 }, query: { test: 1, bla: "10" } })
    usersApi.createUser({ body: { name: "Ivan", age: 21 } });
});


