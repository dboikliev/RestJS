requirejs.config({
    baseUrl: "src/"
});

require(["client"], () => {
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
});
