// Fetch requirements
var twitter = require("./lib/twitter.js"),
    instagram = require("./lib/instagram.js"),
    colors = require("colors"),
    file = require("./lib/file.js");

// Create the basic class (initialize at the bottom!)
var app = (function(){

    var self = {};

    self.init = function(){

        twitter.init(

            "uWqCIPlpOWdRadj2rwCWg",
            "brjgau7BZyFaiMRL3wSriuzeWdeXWR0zbT8m7WwWQhk",
            "436100606-Lxl8dwU9Sdh0xnqGPZNUxICJF1qoLxvIKOPTjmir",
            "tL1AEqt8yrPF9DeS2OMw1qwiiTCO13M29VnNDn4pO72vG",

        function(err, data){

            if(err) {
                throw new Error(err);
            }

            console.log(data.green);

            connect_instagram(accept_input);
        });
    }

    var connect_instagram = function(callback) {

        instagram.init(

            "ca2dc2c960d04f5aa375c4a347a0df84",
            "bef81df4877a4c88aee96bc0f25a0be6",

        function(err, data){

            if(err) {
                throw new Error(err);
            }

            console.log(data.green);

            if(typeof callback == "function")
                callback();
        });
    }

    var accept_input = function() {

        console.log("NSA Twitter Scraper".white.underline);
        console.log("Please enter search criteria:".white.underline);

        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', function (text) {

            // Remove newlines...
            text = text.replace(/(\r\n|\n|\r)/gm,"");

            console.log("[Twitter]".blue, "Fetching Tweets containing " + text + "...");
            process.stdin.pause();

            twitterSearch(text)
        });
    }

    var twitterSearch = function(text) {

        twitter.search(text , 5, function(err, data, status){

            if(err)
                console.log(err);

            for(var k in data) {
                console.log("[Twitter]".blue, data[k].text.replace(/(\r\n|\n|\r)/gm,""));
            }

            file.writeTweetLog(text, data, function(err, data){

                if(err)
                    console.log("[Twitter]".red, err.red);

                console.log("[Twitter]".blue, data);

                console.log("[Instagram]".magenta,"Fetching Instagram pictures containing " + text + "...")

                instagramSearch(text);

            });
        });
    }

    var instagramSearch = function(text) {

        instagram.search(text, 5, function(err, data){

            if(err)
                console.log(err);

            if(data.length > 0) {

                console.log("[Instagram]".magenta, "Fetched " + data.length + " images from Instagram.");

                file.writeInstagramPicture(text, data, function(){

                    console.log("Please enter search criteria:".white.underline);
                    process.stdin.resume();

                });

            } else {

                console.log("Please enter search criteria:".white.underline);
                process.stdin.resume();
            }
        });
    }

    return self;

})();

// Start the app!
app.init();