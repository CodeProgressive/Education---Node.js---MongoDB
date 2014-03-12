var server = (function(){

    // We initialize the object to be returned at the end
    var self = {},

        // Private variables used throughout the server
        express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        // We insert the http server into socket io to make it
        // operate on the same port and address
        io = require('socket.io').listen(server);

    self.init = function(port){

        // We want to listen on the process argument or default port
        server.listen(process.argv[2] || port);

        // Make sure every static file is loaded from the base folder
        app.use(express.static(__dirname));

        // TODO : Use the variable called 'io' to create socket functions here
    }

    return self;

})();

// Start the server and insert a default port
server.init(8080);