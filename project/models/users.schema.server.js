var mongoose = require("mongoose");
// require('mongoose-type-email');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    roles: {type: String, enum: ["Admin", "Event Organizer", "End User"]},
    firstName: String,
    lastName: String,
    email: String,
    phone: {type: Number},
    following: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    // _wishlist: [{type: mongoose.Schema.Types.ObjectId, ref:"EventModel"}],
    rsvp_events: [{type: mongoose.Schema.Types.ObjectId, ref:"EventModel"}],
    events: [{type: mongoose.Schema.Types.ObjectId, ref:"EventModel"}],
    facebook: {
        id:    String,
        token: String
    },
    google: {
        id:    String,
        token: String
    }
}, {collection: "userproject"});
module.exports = userSchema;