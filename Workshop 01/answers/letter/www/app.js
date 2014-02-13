var fs = require("fs");

var name = "Ricardo Snoek"

var loadLetter = function(callback) {
    fs.readFile("letter.txt", callback);
};

var processLetter = function(error, data) {
    if (error)
        return console.error(error);
    else
        console.log(data + name);
};

loadLetter(processLetter);