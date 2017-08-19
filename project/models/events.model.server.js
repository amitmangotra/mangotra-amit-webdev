var mongoose = require("mongoose");
var eventSchema = require("./events.schema.server");
var eventModel =  mongoose.model("EventModel", eventSchema);

eventModel.createEvent = createEvent;
eventModel.findEventsByUser = findEventsByUser;
eventModel.allEvents = allEvents;
eventModel.addStory = addStory;

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
    return eventModel.find({organizer: userId});
}

function allEvents() {
    return eventModel.find()
        .populate('stories')
        .populate('user_rsvps')
        .populate('organizer')
        .exec();
}

function addStory(eventId, storyId) {
    return eventModel.findById(eventId)
        .then(function (event) {
            return event.stories.push(storyId);
        });
}