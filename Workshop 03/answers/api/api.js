module.exports = (function () {
    var self = {};

    var fs = require("fs");

    self.startHelper = function (app, api, callback) {
        if (typeof api.start === "function")
            api.start(app);
        else
            console.log("The requested API does not exist or is not a valid API.");

        if (typeof callback === "function")
            callback();
    };

    self.readHelper = function (file, req, res, callback) {
        fs.readFile(file, "utf8", function (err, data) {
            if (err)
                return false, console.log("Could not read file: " + file + ". Because of: " + err);
            else if ((req !== null) && (data = JSON.parse(data)))
                if (data[req])
                    return returnData(res, JSON.stringify(data[req]), "application/json");
                else
                    return returnError(res, "The search did not give any results");
            else
                return returnData(res, data, "application/json");
        });

        if (typeof callback === "function")
            callback();
    };

    self.writeHelper = function (file, req, res, callback) {
        var input = req.body;

        fs.readFile(file, "utf8", function (err, data) {
            if (err)
                return false, console.log("Could not read file: " + file + ". Because of: " + err);
            else if (data = JSON.parse(data))
                if ((req.params.id !== undefined) && (typeof input === "object") && (data[req.params.id] = input))
                    return saveData(res, JSON.stringify(data), file);
                else if (typeof input === "object")
                    if (data[(Math.max.apply(null, Object.keys(data)) + 1)] = input)
                        return saveData(res, JSON.stringify(data), file);
                else
                    return returnError(res, "Could not write to the API.");
            else
                return returnError(res, "Could not write to the API.");
        });

        if (typeof callback === "function")
            callback();
    };

    var saveData = function (res, data, file) {
        fs.writeFile(file, data.replace(/^\s*[\r\n\t]/gi, ""), {"encoding":  "utf8"}, function(err){
            if (err)
                return false, console.log("Could not save file: " + file + ". Because of: " + err);
            else
                return returnData(res, "Successfully saved the object to the API.", "text/html");
        });
    };

    var returnData = function (res, data, type) {
        res.setHeader("Content-Type", type);
        res.status(200);
        res.end(data);
        return true;
    };

    var returnError = function (res, error) {
        res.setHeader("Content-Type", "text/html");
        res.status(404);
        res.end(error);
        return false;
    };

    return self;
})();
