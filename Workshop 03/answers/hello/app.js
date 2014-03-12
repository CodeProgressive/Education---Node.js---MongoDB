(function(){
    var self = {};

    var http = require("http"),
        url = require("url"),
        server;

    var startServer = function(config, callback) {
        if (typeof config === "object") {
            server = http.createServer(function(req, res) {
                if (typeof callback === "function")
                    callback(req, res);
                else
                    console.log("No request handler given.");
            }).listen(config.port, config.ip);

            if(typeof server === "object")
                console.log("The server is running: " + config.ip + ":" + config.port);
            else
                console.log("The server could not start.");
        } else
            console.log("No configuration file was given.");
    };

    var parseRequests = function(req, res) {
        switch (url.parse(req.url).path){
            case "/awesome":
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Awesome!");
                break;
            default:
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Hello World!");
                break;
        };
    };

    (function(){
        startServer({
            ip: "127.0.0.1",
            port: 1337
        }, function(req, res){
            parseRequests(req, res)
        });
    }());

    return self;
})();