// Require the npm module twitter
var twitter = require("twitter"),
    // And util is required to read the data eventually
    util = require('util'),

    // Create the class
    export_class = (function(){

        var self = {},
            twitter_api;

        self.init = function(consumer_key, consumer_secret, access_token_key, access_token_secret, callback){

            // Make an object containing all required parameters so endusers are forced to enter these!
            var required_parameters = {
                consumer_key: consumer_key,
                consumer_secret: consumer_secret,
                access_token_key: access_token_key,
                access_token_secret: access_token_secret
            }

            // Iterate through the object and check if the parameter is defined
            Object.keys(required_parameters).forEach(function(key) {
                var val = required_parameters[key];
                if (typeof val === 'undefined') {
                    throw new Error('Parameter ' + key + ' is required for twitter.init() to function!');
                }
            });
            // Now access the twitter API with the credentials and check if everything went oké
            twitter_api = new twitter({
                consumer_key: consumer_key,
                consumer_secret: consumer_secret,
                access_token_key: access_token_key,
                access_token_secret: access_token_secret
            }).verifyCredentials(function(data) {

                if(typeof data.statusCode != 'undefined') {

                    if(typeof callback == "function")
                        callback(data);
                    else throw new Error('Could not connect to Twitter!: ' + util.inspect(data.data));

                } else {
                    if(typeof callback == "function")
                        callback(null, "Successfully connected to Twitter!");
                }
            });
        }

        self.search = function(input, amount, callback) {

            twitter_api.search(input, function(data) {

                if(data.statuses.length == 0) {
                    if(typeof callback == "function")
                        callback("No results found...");
                    return false;
                }

                // When more than 15 tweets are asked (which is the maximum Twitter offers per request),
                // then keep getting the next results until the amount is reached...
                if(amount > 15) {

                    // TODO : Repeat the function for as many times as it takes to fetch every one of them

                } else {
                    callback(
                        null,
                        data.statuses.slice(
                            0,
                            ((amount < data.statuses.length)
                                ? amount
                                : data.statuses.length
                            )
                        ),
                        data.search_metadata
                    );
                }
            });
        }

        return self;

    })();

module.exports = export_class;