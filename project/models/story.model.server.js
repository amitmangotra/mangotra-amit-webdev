var mongoose = require("mongoose");
var storySchema = require("./story.schema.server");
var storyModel =  mongoose.model("StoryModel", storySchema);

storyModel.createStory = createStory;
storyModel.findStoriesByUser = findStoriesByUser;
storyModel.removeStory = removeStory;
// eventModel.findEventsByUser = findEventsByUser;
// eventModel.allEvents = allEvents;

module.exports = storyModel;

// var eventModel = require("../models/events.model.server");

function createStory(userId, story) {
    story.writer = userId;
    // var storyTmp = null;
    return storyModel.create(story);
        // .then(function (storyDoc) {
        //     storyTmp = storyDoc;
        //     return eventModel.addStory(storyDoc.event._id, storyDoc._id)
        //         .then(function (eventDoc) {
        //             return storyTmp;
        //         });
        // });
}


function findStoriesByUser(userId) {
    return storyModel.find({writer: userId});
}

function removeStory(storyId) {
    return storyModel.remove({_id: storyId});
}
// function findEventsByUser(userId) {
//     return eventModel.find({organizer: userId});
// }
//
// function allEvents() {
//     return eventModel.find();
// }