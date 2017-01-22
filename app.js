requirejs.config({
    baseUrl: "src/"
});

require(["client"], () => {
    rest("http://localhost")
        .get({ bla: 5 })
        .then(console.log, console.log);
});
