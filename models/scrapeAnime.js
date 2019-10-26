var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnimeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
});


var scrapeAnime = mongoose.model("scrapeAnime", AnimeSchema);

module.exports = scrapeAnime;
