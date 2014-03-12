// And util is required to read the data eventually
var util = require('util'),

// Create the class
    export_class = (function(){

        var self = {},
            instagram;

        self.init = function(client_id, client_secret, callback){

            // Make an object containing all required parameters so endusers are forced to enter these!
            var required_parameters = {
                consumer_key: client_id,
                consumer_secret: client_secret
            }

            // Iterate through the object and check if the parameter is defined
            Object.keys(required_parameters).forEach(function(key) {
                var val = required_parameters[key];
                if (typeof val === 'undefined') {
                    throw new Error('Parameter ' + key + ' is required for twitter.init() to function!');
                }
            });

            instagram = require('instagram').createClient(client_id, client_secret);

            if(typeof callback == "function") {
                callback(null, "Successfully connected to Instagram!");
            }
        }

        self.search = function(input, amount, callback) {

            instagram.tags.media(input, function (data, err) {

                if(err) {
                    if(typeof callback == "function")
                        callback(err);
                }

                if(data.length == 0) {
                    if(typeof callback == "function")
                        callback("No results found...");
                    return false;
                }

                // When more than 20 Instagram tags are asked (which is the maximum Instagram offers per request),
                // then keep getting the next results until the amount is reached...
                if(amount > 20) {

                    // TODO : Repeat the function for as many times as it takes to fetch every one of them

                } else {
                    callback(
                        null,
                        data.slice(
                            0,
                            ((amount < data.length)
                                ?amount
                                :data.length
                                )
                        )
                    );
                }
            });
        }

        return self;

    })();

module.exports = export_class;