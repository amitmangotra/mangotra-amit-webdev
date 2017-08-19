var mongoose = require("mongoose");
var eventSchema = mongoose.Schema({
    title: String,
    address: String,
    date: {type: Date, min: Date.now},
    description: String,
    organizer: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    user_rsvps: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    stories: [{type: mongoose.Schema.Types.ObjectId, ref:"StoryModel"}]
}, {collection: "event"});
module.exports = eventSchema;