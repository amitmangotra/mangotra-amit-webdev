var mongoose = require("mongoose");
var pageSchema =  mongoose.Schema({
    _website: {type: mongoose.Schema.Types.ObjectId, ref:"WebsiteModel"},
    name: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref:"WidgetModel"}]
}, {collection: "page"});
module.exports = pageSchema;