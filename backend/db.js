/*
 * The file will take care of the database connectivity
 */

// development Db.js
var mongoose = require('mongoose');
var uri = "mongodb://54.71.18.74:27017/printgenie";//local
// var uri = "mongodb://localhost:27017/printgenie"; // staging
var options = {
    user: 'printgenie',
    pass: 'SGtf437Gtfr',
    // server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
    reconnectTries: 10,
    useNewUrlParser: true 
};
 mongoose.Promise = global.Promise; 

var connect = mongoose.connect(uri, options);
mongoose.set('debug', true);

// check if we are connected successfully or not
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('-->-->! Database1 Connected -->-->!');
    // console.log("*******************\n\n\n\n\n\n")
});
