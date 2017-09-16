//config/passport.js

// load all of the strategies
var GoogleOathStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var usrCtrl = require('../controllers/userController');
var bcrypt = require('./bycrypt');

module.exports = function(passport, cassandra) {

    //used to serialize the user for the session
    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });

    /*########################################################################################
     *  Google OAuth strategy
     *########################################################################################*/
    var googleCreds = require('./googleCreds');
    googleCreds = ENV.getEnv(googleCreds, 'Google Credentials Config');

    passport.use(new GoogleOathStrategy(googleCreds,
        function(req, accessToken, refreshToken, profile, cb) {
            process.nextTick(function() {

                if (!cassandra.instance.User) {
                    return cb(null, false, { error: "Cannot find database schema" });
                }

                usrCtrl.getUser(cassandra, profile.displayName,
                    function(err, user) {
                        if (err) {
                            return cb(null, false, { error: "Database error finding user: " + err });
                        }
                        if (!user) {
                            usrCtrl.createUser(cassandra, profile.displayName, profile.emails[0].value, null, profile.name.givenName, profile.name.familyName, profile.displayName, true,
                                function(err) {
                                    if (err) {
                                        return cb(null, false, { error: "Database error saving google user: " + err });
                                    } else {
                                        // get the newly created user
                                        usrCtrl.getUser(cassandra, profile.displayName,
                                            function(err, newUser) {
                                                if (err) {
                                                    return cb(null, false, { error: "Database error finding user: " + err });
                                                }
                                                return cb(null, newUser);
                                            });
                                    }
                                });
                        } else {
                            return cb(null, user);
                        }

                    });
            });
        }));

    /*########################################################################################
     *  Local Strategy - signup
     *########################################################################################*/

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

                if (!cassandra.instance.User) {
                    return done(null, false, { error: "Cannot find Database schema" });
                }

                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                usrCtrl.getUser(cassandra, username,
                    function(err, user) {
                        // if there are any errors, return the error
                        if (err) {
                            return done(null, false, { error: "Database Error in Registering user: " + err });
                        }

                        // check to see if theres already a user with that username
                        if (user) {
                            return done(null, false, { error: "That username has been taken" });
                        } else {
                            // if there is no user with that email
                            //generate hash of password
                            bcrypt.cryptPassword(password,
                                function(err, hash) {
                                    if (err) {
                                        return done(null, false, { error: "Unable to create hash of password: " + err });
                                    }
                                    // create the user
                                    usrCtrl.createUser(cassandra, username, req.body.email, hash, req.body.fname, req.body.lname, req.body.fname + " " + req.body.lname, false,
                                        function(err) {
                                            if (err) {
                                                return done(null, false, { error: "Database Error in creating new user: " + err });
                                            }
                                            // Get the newly created user
                                            usrCtrl.getUser(cassandra, username,
                                                function(err, newUser) {
                                                    // if there are any errors, return the error
                                                    if (err) {
                                                        return done(null, false, { error: "Database Error in Registering user: " + err });
                                                    }
                                                    return done(null, newUser);
                                                });
                                        });
                                });
                        }
                    });
            });
        }));

    /*########################################################################################
     *  Local Strategy - login
     *########################################################################################*/
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with username and password from our form
            process.nextTick(function() {
                // find a user whose username is the same as the forms username
                // we are checking to see if the user trying to login already exists
                usrCtrl.getUser(cassandra, username,
                    function(err, user) {
                        // if there are any errors, return the error before anything else
                        if (err) {
                            return done(null, false, { error: 'Database Error on login: ' + err });
                        }

                        // if no user is found, return the message
                        if (!user) {
                            return done(null, false, { error: 'No user found.' });
                        }

                        // if the user is found verify the password
                        bcrypt.comparePass(password, user.pass,
                            function(err, passMatch) {
                                if (err) {
                                    return done(null, false, { error: 'Invalid Password.' });
                                }

                                // all is well, return successful user
                                return done(null, user);
                            });
                    });
            });
        }))
}