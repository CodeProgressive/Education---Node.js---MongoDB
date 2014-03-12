module.exports = (function(){
    var self = {};

    var express = require("express"),
        http = require("http"),
        path = require("path");

    var app = express(),
        pub = path.join(__dirname, "public"),
        server;

    var configureServer = function(config) {
        if(app.configure(function() {
            app.set("ip", config.ip);
            app.set("port", config.port);
            app.use(express.static(pub));
            app.use(express.urlencoded());
            app.use(express.bodyParser());
            app.use(express.json());
        }))
            return true;
        else
            return false, console.log("Could not configure the express server");
    };

    self.startServer = function(config){
        if (configureServer(config)) {
            if(server = http.createServer(app).listen(app.get('port'), function(){console.log("The server started on: " + app.get("ip") + ":" + app.get("port"))}))
                return app;
            else
                return false, console.log("The server could not start.");
        }
    };

    return self;
})();