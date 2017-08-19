var app = require('../../express');
var storyModel = require("../models/story.model.server");

app.post('/api/user/:uid/story/new', createStory);
// app.get('/api/user/:uid/events', findEventsByUser);
// app.get('/api/user/events', allEvents);

function createStory(req, res) {
    var userId = req.params.uid;
    var story = req.body;
    return storyModel
        .createStory(userId, story)
        .then(function (storyDoc) {
            res.json(storyDoc);
            return;
        }, function (err) {
            res.statusCode(500).send(err);
            return;
        });
}

// function findEventsByUser(req, res) {
//     var userId = req.params.uid;
//     return eventModel
//         .findEventsByUser(userId)
//         .then(function (events) {
//             res.json(events);
//         }, function (err) {
//             res.sendStatus(404).send(err);
//         });
// }
//
// function allEvents(req, res) {
//     return eventModel
//         .allEvents()
//         .then(function (events) {
//             res.json(events);
//             return;
//         }, function (err) {
//             res.sendStatus(404).send(err);
//             return;
//         });
// }