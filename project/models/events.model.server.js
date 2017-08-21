var mongoose = require("mongoose");
var eventSchema = require("./events.schema.server");
var eventModel =  mongoose.model("EventModel", eventSchema);

eventModel.createEvent = createEvent;
eventModel.findEventsByUser = findEventsByUser;
eventModel.allEvents = allEvents;
eventModel.addStory = addStory;
eventModel.removeEvent = removeEvent;

module.exports = eventModel;

var userModel = require("../models/users.model.server");

function createEvent(userId, event) {
    event.organizer = userId;
    var eventTmp = null;
    return eventModel
        .create(event)
        .then(function (eventDoc) {
            eventTmp = eventDoc;
            return userModel.addEvent(userId, eventDoc._id)
                .then(function (userDoc) {
                    return eventTmp;
                });
        });
}

function findEventsByUser(userId) {
    return userModel.findUserById(userId)
        .then(function (user) {
            if(user.roles === 'End User') {
                return eventModel.find({user_rsvps: user._id});
            } else if(user.roles === 'End User') {
                return eventModel.find({user_rsvps: user._id});
            }
        });
}

function allEvents() {
    return eventModel.find()
        .populate('user_rsvps')
        .populate('organizer')
        .exec();
}

function removeEvent(userId, eventId) {
    return eventModel.remove({_id: eventId})
        .then(function (response) {
            return userModel.removeEvent(userId, eventId);
        });
}

function addStory(eventId, storyId) {
    return eventModel
        .findById(eventId)
        .then(function (event) {
            event.stories.push(storyId);
            return event.save();
        });
}