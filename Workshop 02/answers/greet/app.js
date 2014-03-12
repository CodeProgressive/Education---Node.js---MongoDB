// Require some node modules
var colors = require("colors"),
    moment = require("moment");

// If no name is inserted, stop the node and show an error
if(typeof process.argv[2] == 'undefined') {
    console.log("Please insert your name".red);
    // Exit using 1 means there was an error
    process.exit(1);
}

// Create the strings to show
var greet = "Hi " + process.argv[2],
    time = "it’s " + moment().format('MMMM Do YYYY, h:mm:ss a') + " right now!";

// Now show them while adding the color
console.log(greet.green + ", " + time.yellow);