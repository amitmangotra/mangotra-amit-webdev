var app = require('../../express');
var eventModel = require("../models/events.model.server");

app.post('/api/user/:uid/event/new', createEvent);
app.get('/api/user/:uid/events', findEventsByUser);
app.get('/api/user/events', allEvents);

function createEvent(req, res) {
    var userId = req.params.uid;
    var event = req.body;
    return eventModel
        .createEvent(userId, event)
        .then(function (eventDoc) {
            res.json(eventDoc);
            return;
        }, function (err) {
            res.statusCode(500).send(err);
            return;
        });
}

function findEventsByUser(req, res) {
    var userId = req.params.uid;
    return eventModel
        .findEventsByUser(userId)
        .then(function (events) {
            res.json(events);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}

function allEvents(req, res) {
    return eventModel
        .allEvents()
        .then(function (events) {
            res.json(events);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}