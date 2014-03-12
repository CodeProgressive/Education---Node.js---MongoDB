module.exports = (function () {
    var self = {};

    var api = require("../api.js"),
        file = __dirname + "/../database/names.json";

    self.start = function (app) {
        app.get("/names/", function (req, res) {
            read(req, res);
        });

        app.get("/names/:id", function (req, res) {
            read(req, res);
        });

        app.post("/names", function (req, res) {
            write(req, res);
        });

        app.post("/names/:id", function (req, res) {
            write(req, res);
        });
    };

    var read = function (req, res) {
        if (api.readHelper(file, ((req.params.id) ? req.params.id : null), res))
            console.log("Search the file was successful.");
        else
            console.log("Could not search the file.");
    };

    var write = function (req, res) {
        if (api.writeHelper(file, ((req) ? req : null), res))
            console.log("Writing to the file was successful.");
        else
            console.log("Could not write to the file.");
    };

    return self;
})();