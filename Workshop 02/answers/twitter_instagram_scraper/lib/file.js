var fs = require("fs"),
    request = require('request'),
    colors = require('colors'),

    export_class = (function(){

        var self = {},
            baseFolder = "./result/";

        self.writeTweetLog = function(name, textArray, callback) {

            var completeText = parseTweetForLog(textArray);

            if(!fs.existsSync(baseFolder + name)){

                fs.writeFile(baseFolder + name, completeText, function (err) {

                    if (err) {
                        if(typeof callback == "function"){
                            callback(err, null);
                        } else throw new Error(err);
                    } else {
                        if(typeof callback == "function")
                            callback(null, "New file created at: " + baseFolder + name + ". Finished writing.");
                    }
                });

            } else {

                fs.appendFile(baseFolder + name, completeText, function (err) {

                    if (err) {
                        if(typeof callback == "function"){
                            callback(err, null);
                        } else throw new Error(err);
                    } else {
                        if(typeof callback == "function")
                            callback(null, "New file created at: " + baseFolder + name + ". Finished writing.");
                    }
                });
            }
        }

        var instagramStatus = {
            total: 0,
            current: 0,
            callback: null
        };

        self.writeInstagramPicture = function(name, pictureArray, callback) {

            instagramStatus.total = pictureArray.length;
            instagramStatus.callback = callback;

            console.log("[Instagram]".magenta, "Downloading images from instagram");

            if(pictureArray.length > 0) {
                for(var x in pictureArray) {
                    instagramStatus.current ++;
                    downloadInstagramPicture(pictureArray[x].images.standard_resolution.url, baseFolder + name + x + ".jpg", checkIfAllPicturesAreDownloaded);
                }
            }
        }

        var checkIfAllPicturesAreDownloaded = function() {

            if(typeof instagramStatus.callback == "function" && instagramStatus.current == instagramStatus.total) {
                console.log("[Instagram]".magenta, "All pictures finished downloading");
                instagramStatus.callback();
                instagramStatus = {
                    total: 0,
                    current: 0,
                    callback: null
                };
            }
        }

        var downloadInstagramPicture = function(uri, filename, callback){

            request.head(uri, function(err, res, body){
                request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
            });
        };

        var parseTweetForLog = function(tweetArray) {

            var returnValue = "";

            for(var x in tweetArray) {
                returnValue += tweetArray[x].created_at + " : " + tweetArray[x].text.replace(/(\r\n|\n|\r)/gm,"") + "\n";
            }

            return returnValue;
        }

        return self;

    })();

module.exports = export_class;