requirejs.config({
    baseUrl: "src/"
});

require([
    'client'
], () => {
    rest("http://www.abv.bg").get({ bla: 5}).then(success => console.log(success), error => console.log(error));
});
