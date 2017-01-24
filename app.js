requirejs.config({
    baseUrl: "src/"
});

require(["client"], () => {
    rest("http://localhost")
        .headers({ "my-custom-header": "bla" })
        .query({ bla: 5 })
        .body({ sada: 123 })
        .get()
        .then(console.log, console.log);
});
