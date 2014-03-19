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

    // Public variable containing connections
    self.sockets = [];
    // Public variable containing messages
    self.messages = [];

    self.init = function(port){

        // We want to listen on the process argument or default port
        server.listen(process.argv[2] || port);

        // Make sure every static file is loaded from the base folder
        app.use(express.static(__dirname));

        // Start listening for connections
        io.sockets.on('connection', function (socket) {

            // Push the socket into an array
            self.sockets.push(socket);

            // Send the messages that are already in the array
            socket.emit('messages', {content : self.messages});

            // On every message send it to every socket
            socket.on('message', function(data) {

                // Push the message into an array
                self.messages.push(data.content);

                self.sockets.forEach(function(value) {
                    value.emit('message', {content : data.content})
                });
            });

            // Remove the socket from the array when disconnected
            socket.on('disconnect', function(){
                // Find the location of the socket in the array
                var index = self.sockets.indexOf(socket);
                // When found
                if (index > -1) {
                    // Remove it and reorder the array
                    self.sockets.splice(index, 1);
                }
            });
        });
    }

    return self;

})();

// Start the server and insert a default port
server.init(8080);