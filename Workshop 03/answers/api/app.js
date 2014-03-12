(function(){
    var self = {};

    var server = require("./server.js"),
        api = require("./api.js");

    var names = require("./api/names.js");

    var startServer = function(callback) {
        var app = server.startServer({
            ip: "127.0.0.1",
            port: 1337
        });

        if ((app) && (typeof callback === "function"))
            callback(app);
    };

    (function(){
        startServer(function(app){
            api.startHelper(app, names);
        });
    }());

    return self;
})();