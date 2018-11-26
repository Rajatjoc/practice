'use strict';

// Passport management
var BearerStrategy = require('passport-http-bearer').Strategy;
var jwt = require('jsonwebtoken');
// var Constant = require("./../../constants");
// var Constant = require('./../../config/auth_token')

// Module exports
module.exports = function(passport) {
    // Bearer token based authentication
    passport.use(new BearerStrategy(function(token, done) {
        jwt.verify(token, 'shhhhh-koi-hai', function(err, user) {
            if (err) {
                return done(null, false);
            } else {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        });
    }));
}