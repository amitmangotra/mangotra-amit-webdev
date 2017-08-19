var mongoose = require("mongoose");
var userSchema = require("./users.schema.server");
// var db = require("./database");

var userModel =  mongoose.model("UserModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.deleteUser = deleteUser;
userModel.getAllUsers = getAllUsers;
// userModel.removeFromFollowersList = removeFromFollowersList;
// userModel.removeFromFollowingList = removeFromFollowingList;
userModel.followUser = followUser;
userModel.unfollowUser = unfollowUser;
userModel.addEvent = addEvent;
userModel.findEventsByUser = findEventsByUser;
// userModel.removeWebsite = removeWebsite;

module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId)
        .populate('followers')
        .populate('following')
        .populate('events')
        .populate('rsvp_events')
        .exec();
}

function updateUser(userId, user) {
    return userModel.update({_id: userId}, {
        $set: user
    });
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function deleteUser(userId) {
    return userModel.deleteOne({_id: userId});
}

function getAllUsers() {
    var userRole = "Event Organizer";
    return userModel.find({roles: userRole});
}

function followUser(organizer, userId) {
    return userModel
        .findById(organizer._id)
        .then(function (user) {
            user.followers.push(userId);
            return user.save()
                .then(function (response) {
                    return userModel
                        .findById(userId)
                        .then(function (user) {
                            user.following.push(organizer._id);
                            return user.save();
                        });
                });
        });
}

function unfollowUser(organizer, userId) {
    return userModel
        .findById(organizer._id)
        .then(function (user) {
            var index = user.followers.indexOf(userId);
            user.followers.splice(index, 1);
            return user.save()
                .then(function (response) {
                    userModel
                        .findById(userId)
                        .then(function (user) {
                            var index = user.following.indexOf(organizer._id);
                            user.following.splice(index, 1);
                            return user.save();
                        });
                });
        });
}

// function removeFromFollowersList(userId, followerId) {
//     return userModel
//         .findById(followerId)
//         .then(function (user) {
//             var index = user.following.indexOf(userId);
//             user.following.splice(index, 1);
//             return user.save();
//         });
// }
//
// function removeFromFollowingList(userId, followingId) {
//     return userModel
//         .findById(followingId)
//         .then(function (user) {
//             var index = user.followers.indexOf(userId);
//             user.followers.splice(index, 1);
//             return user.save();
//         });
// }

function addEvent(userId, eventId) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.events.push(eventId);
            return user.save();
        });
}

function findEventsByUser(userId) {
    return userModel.findUserById(userId);
}
