/**
 * Load the required libraries from node.js
 */
    // http server, to catch http requests
var http = require("http"),
    // the url library is used to get url information regarding the http request
    url = require("url"),
    // path is used to figure out absolute paths on the server
    path = require("path"),
    // the filesystem library is used for multiple file reading purposes
    fs = require("fs");

// And finally we define the default port,
// note the process.argv takes the first argument after calling node app [argument]
// e.g. node app 80 - meaning the node will run on port 80
port = process.argv[2] || 8888;

/**
 * Here we start the server,
 * making node wait for any http request coming it's way.
 *
 * The returning callback function gives a request and a response object
 */
http.createServer(function(request, response) {

    // It's time to find out what url was requested,
    // we do this by parsing the url first and then adding the absolute path to it
    var uri = '/content' + url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    // Make sure all the headers are filled out correctly!
    // We don't want css to be returned as html for example...
    var contentTypesByExtension = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript"
    };

    // Now we check if the file exists, note that the rest of the script is
    // executed inside the callback function. This is because the exists function is asynchronous,
    // meaning that else the check may not have been completed before the rest of the code runs...
    // We could have used existsSync, but this seemed better at the time.
    fs.exists(filename, function(exists) {

        // Now if it doesn't exist, stop trying and return a 404
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        // If it does, but it's only a folder then get the default index file, in our case presentation.html
        // note, the static return will be a folder when no filename is specified in the url
        if (fs.statSync(filename).isDirectory()) filename += 'presentation.html';

        // Now that all checks are complete, we use the filesystem library to read the file.
        // We do this in binary mode to make sure we get every bit of the file without malforming it
        // Again we use the asynchronous version, so we need the callback function!
        fs.readFile(filename, "binary", function(err, file) {

            // If something does occur here,... we've got a server error, so stop and show this.
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            // Now we make sure we set the headers according to the extension (from the array made before)
            var headers = {};
            var contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType) headers["Content-Type"] = contentType;

            // And we send the response with a nice 200 header meaning everything went a-oke!
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });

    // The listen method actually initializes the server!
}).listen(parseInt(port, 10));

// We give some feedback to the person running the node server, just to be nice...
console.log("The presentation can now be viewed at http://localhost:" + port + "/\nPress CTRL + C to shutdown the node server!");