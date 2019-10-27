
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();


app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });



var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

mongoose.connect(MONGODB_URI)

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
    db.scrapeAnime.drop(newAnime)
        .then(function (dropAnime) {
            // View the added result in the console
            console.log(dropAnime);
        })
        .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
        });
});


app.get("/anime/:id", function (req, res) {
    db.scrapeAnime.findOne({ _id: req.params.id }).then(function (data) {
        res.json(data);
    }).catch(function (err) {
        res.json(err);
    });
});

app.get("/scrape", function (req, res) {
    axios.get("http://kissanimefree.net/new-season/").then(function (response) {

        var $ = cheerio.load(response.data);

        // searches each movie-preview class
        $('.movie-preview').each(function (i, element) {
            var newAnime = {}
            // gets title
            newAnime.title = $(this).find('.movie-title').children('a').attr('title');
            // gets story
            newAnime.story = $(this).find('.story').text();
            // gets poster 
            newAnime.poster = $(this).find('img').attr('src');
            // gets link
            newAnime.link = $(this).find('.movie-poster').children('a').attr('href');

            //posts to scrapeAnime db
            db.scrapeAnime.create(newAnime)
                .then(function (dbAnime) {
                    // View the added result in the console
                    console.log(dbAnime);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
    })
    res.send("Scrape Complete");
})


app.listen(PORT, function () {
    console.log("App running on port 3000!");
})


