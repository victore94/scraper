
var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");


var app = express();

app.use(express.static("public"));


var databaseUrl = "scraper";
var collections = ["scrapeAnime"];
/////////////////////////////////
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
// var db = require("./models");


var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

mongoose.connect(MONGODB_URI)

///////////////////////////////////


var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
    console.log("Database Error:", error);
});


app.get("/", function (req, res) {
    res.send("Hello world");
});

app.get("/all", function (req, res) {
    db.scrapeAnime.find({}, function (err, found) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(found);
        }
    });
})

app.get("/reset", function (req, res) {
    db.scrapeAnime.drop()
    res.send("reset");
});





app.get("/anime/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

app.get("/scrape", function (req, res) {
    axios.get("http://kissanimefree.net/new-season/").then(function (response) {

        var $ = cheerio.load(response.data);

        // searches each movie-preview class
        $('.movie-preview').each(function (i, element) {
            let newAnime = {
                // gets title
                title: $(element).find('.movie-title').children('a').attr('title'),
                // gets story
                story: $(element).find('.story').text(),
                // gets poster 
                poster: $(element).find('img').attr('src'),
                // gets link
                link: $(element).find('.movie-poster').children('a').attr('href'),
            };
            //posts to scrapeAnime db
            db.scrapeAnime.insert({
                newAnime: newAnime
            })
        });
    });

    res.send("Scrape Complete");
});

app.listen(PORT, function () {
    console.log("App running on port 3000!");
});
