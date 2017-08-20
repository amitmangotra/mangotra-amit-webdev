var app = require("../../express");
var userModel = require("../models/users.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


app.post("/api/login", passport.authenticate('local'),login);

app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);

app.get("/api/:uid/users", getAllUsers);
app.get("/api/followers/user/:userId", getFollowersList);
app.get("/api/following/user/:userId", getFollowingList);
app.post("/api/user", createUser);
app.post("/api/register", register);
app.post("/api/delete/follower/user/:userId", removeFromFollowersList);
app.post("/api/delete/following/user/:userId", removeFromFollowingList);
app.put("/api/user/:userId", updateUser);
app.put("/api/follow/user/:userId", followOrganizer);
app.put("/api/unfollow/user/:userId", unfollowOrganizer);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/user/:uid/events", findEventsByUser);
app.get("/api/checkLogin", checkLogin);
// app.get('/experience/auth/google', abcd);


function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            if (!user) {
                return done(null, false);
             }
            return done(null, user);
        }, function (err) {
            if (err) {
                return done(err);
            }
        });
}


function login(req, res) {
    var user = req.user;
    res.json(user);

}

function register (req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(
            function(user){
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            // console.log(user);
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
    userModel.unfollowUser(organizer, userId)
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
        .findEventsByUser(userId)
        .then(function (events) {
            res.json(events);
        }, function (err) {
            res.sendStatus(404).send(err);
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