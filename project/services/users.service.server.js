var app = require("../../express");
var userModel = require("../models/users.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};
var bcrypt = require("bcrypt-nodejs");

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.post("/api/project/login", passport.authenticate('local'),login);

app.get("/api/project/user/:userId", getUserById);
app.get("/api/project/user", findUser);

app.get("/api/project/:uid/users", getAllUsers);
app.get("/api/project/followers/user/:userId", getFollowersList);
app.get("/api/project/following/user/:userId", getFollowingList);
app.post("/api/project/user", createUser);
app.post("/api/project/register", register);
app.post("/api/project/delete/follower/user/:userId", removeFromFollowersList);
app.post("/api/project/delete/following/user/:userId", removeFromFollowingList);
app.put("/api/project/user/:userId", updateUser);
app.put("/api/project/follow/user/:userId", followOrganizer);
app.put("/api/project/unfollow/user/:userId", unfollowOrganizer);
app.delete("/api/project/user/:userId", deleteUser);
app.get("/api/project/user/:uid/events", findEventsByUser);
app.get("/api/project/checkLogin", checkLogin);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/thirdpartyLogin',
        failureRedirect: '/project/#!/login'
    }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/#!/thirdpartyLogin',
        failureRedirect: '/project/#!/login'
    }));
app.put("/api/project/:userId/events/rsvpEvents", interestedInEvent);
app.post("/api/project/logout", logout);
app.get("/api/project/all/users/:userRole", findAllUsers);

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}


function localStrategy(username, password, done) {
    // userModel
    //     .findUserByCredentials(username, password)
    //     .then(function (user) {
    //         if (!user) {
    //             return done(null, false);
    //          }
    //         return done(null, user);
    //     }, function (err) {
    //         if (err) {
    //             return done(err);
    //         }
    //     });
    userModel
        .findUserByUsername(username)
        .then(
            function(user) {
                if (user && bcrypt.compareSync(password, user.password)) { return done(null, user); }
                return done(null, false);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register (req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
        .createUser(user)
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            });
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(user);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        });
}

function deleteUser(req, res) {
    var userId =  req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        });
}

function getUserById(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findUser(req, res) {
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
                return;
            }, function (err) {
                res.sendStatus(404).send(err);
                return;
            });
        return;
    } else if(username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(404).send(err);
            });
    }
}

function getAllUsers(req, res) {
    userModel
        .getAllUsers()
        .then(function (users) {
            res.json(users)
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function getFollowersList(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (data) {
            res.json(data.followers);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function getFollowingList(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (data) {
            res.json(data.following);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function followOrganizer(req, res) {
    var userId = req.params.userId;
    var organizer = req.body;
    userModel
        .followUser(organizer, userId)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function unfollowOrganizer(req, res) {
    var userId = req.params.userId;
    var organizer = req.body;
    userModel
        .unfollowUser(organizer, userId)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function removeFromFollowersList(req, res) {
    var userId = req.params.userId;
    var follower = req.body;
    userModel
        .removeFromFollowersList(userId, follower._id)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function removeFromFollowingList(req, res) {
    var userId = req.params.userId;
    var following = req.body;
    userModel
        .removeFromFollowingList(userId, following._id)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.json(err);
            return;
        });
}

function findEventsByUser(req, res) {
    var userId = req.params.uid;
    return userModel
        .findUserById(userId)
        .then(function (user) {
            if(user.roles === 'End User') {
                res.json(user.rsvp_events);
                return;
            } else if(user.roles === 'End User') {
                res.json(user.events);
                return;
            }
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function (user) {
            done(null, user);
        }, function (err) {
            done(err, null);
        });
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var newFbUser = {
                        username:  profile.displayName.split(" ")[0],
                        firstName: profile.displayName.split(" ")[0],
                        lastName:  profile.displayName.split(" ")[1],
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newFbUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function interestedInEvent(req, res) {
    var userId = req.params.userId;
    var event = req.body;
    userModel
        .addToRsvpEvents(event, userId)
        .then(function (response) {
            res.json(response);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function findAllUsers(req, res) {
    var userRole = req.params.userRole;
    if(userRole === 'Admin') {
        userModel.findAllUsers()
            .then(function (response) {
                res.json(response);
                return;
            }, function (err) {
                res.json(err);
                return;
            });
    }
}