var app = require("../../express");

var q = require("q");
const https = require("https");

app.get('/find/events', searchEvent);
app.get('/:urlname/events/:id', findEventbyId);

var appKey = process.env.MEETUP_API_KEY || "162d592f5c53704651484b4c2c104f23";

function searchEvent(req, res) {
    var text = req.query.text.replace(/\s/gi,"+");
    var zipcode = req.query.zipcode;
    apiSearchQuery(text, zipcode)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function apiSearchQuery(text, zipcode) {
    var deferred = q.defer();
    https.get({
        host: 'api.meetup.com',
        path: '/find/events?key='+appKey+'&sign=true&format=json&text='+text+'&zip='+zipcode,
        headers: {
            "Accept": "application/json",
            "app_key": appKey
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}


function findEventbyId(req, res) {
    var urlname = req.params.urlname;
    var eventId = req.params.id;
    apiEventById(urlname, eventId)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function apiEventById(urlname, eventId) {
    var deferred = q.defer();
    https.get({
        host: 'api.meetup.com',
        path: '/'+urlname+'/events/'+eventId+'?key='+appKey+'&sign=true&format=json',
        headers: {
            "Accept": "application/json",
            "app_key": appKey
        }
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}