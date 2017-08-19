var mongoose = require("mongoose");
// require('mongoose-type-email');
var storySchema = mongoose.Schema({
    title: String,
    description: String,
    writer: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    event: {type: mongoose.Schema.Types.ObjectId, ref:"EventModel"}
    // stories: [{type: mongoose.Schema.Types.ObjectId, ref:"StoryModel"}]
}, {collection: "user"});
module.exports = storySchema;