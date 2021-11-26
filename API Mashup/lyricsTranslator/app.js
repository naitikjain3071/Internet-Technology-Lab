const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const axios = require("axios");
const request = require("request");
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
require("dotenv").config();

const dbURI = "mongodb+srv://admin:admin@cluster0.ebu6e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; //your database connection string

const passportSetup = require("./config/passport-setup");
const passport = require("passport");

const authRoutes = require("./routers/auth");
const { get } = require("request");

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		//useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database Connected"))
	.catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [keys.cookieSession]
// }));

//route not found

app.get("/", async (req, res) => {    
        res.render("landingPage.ejs");
});

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
      // Successful authentication, redirect success.
      res.redirect('/auth/song');
    },
  );

app.get("/auth/song", async (req, res) => {
    console.log("")

    // const artist = "Frank Ocean";
    // const songTitle = "Nights";

    // const result = await axios({
    //     method: "GET",
    //     url: `https://api.lyrics.ovh/v1/${artist}/${songTitle}`,
    // });
    // console.log("Result of first API call: ", result.data.lyrics);

    res.render("index");
});

app.post("/auth/song", urlencodedParser, function (req, res) {
    console.log(req.body);
    // res.render("lyrics", { data: req.body });

    const songData = req.body;

    var options = {
        'method': 'GET',
        'url': 'https://api.lyrics.ovh/v1/' + req.body.artist + '/' + req.body.songTitle,
        'headers': {
        }
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        data = response.body;
        // console.log(data);

        const obj = JSON.parse(data);
        const lyrics = obj.lyrics.substring(22);
        // console.log(lyrics);
        res.render("lyrics", { songData: songData, data: obj });
    });
});

app.post("/translate", urlencodedParser, function (req, res) {
    // JSON.stringify(req.body);
    console.log(req.body.songLyrics);
    console.log(req.body.language);

    var options;
    if(req.body.language=="Minion"){
        options = {
            'method': 'GET',
            'url': 'https://api.funtranslations.com/translate/minion.json/?text=' + req.body.songLyrics,
            'headers': {
            }
        };
    }
    else if(req.body.language=="Yoda"){
        options = {
            'method': 'GET',
            'url': 'https://api.funtranslations.com/translate/yoda.json/?text=' + req.body.songLyrics,
            'headers': {
            }
        };
    }
    else if(req.body.language=="Dothraki"){
        console.log("ppppppp");
        options = {
            'method': 'GET',
            'url': 'https://api.funtranslations.com/translate/dothraki.json/?text=' + req.body.songLyrics,
            'headers': {
            }
        };
    }
    else if(req.body.language=="Valyrian"){
        options = {
            'method': 'GET',
            'url': 'https://api.funtranslations.com/translate/valyrian.json/?text=' + req.body.songLyrics,
            'headers': {
            }
        };
    }
    else if(req.body.language=="Mandalorian"){
        options = {
            'method': 'GET',
            'url': 'https://api.funtranslations.com/translate/mandalorian.json/?text=' + req.body.songLyrics,
            'headers': {
            }
        };
    }
    else{
        options = {
            'method': 'GET',
            'url': 'https://api.funtranslations.com/translate/minion.json/?text=' + req.body.songLyrics,
            'headers': {
            }
        };
    }

    request(options, function (error, response) {
        if (error) throw new Error(error);
        const data = JSON.parse(response.body);

        console.log(data);
        JSON.stringify(data);
        res.render("translate-success", { lyrics: req.body.songLyrics, data: data, language: req.body.language});
    });
});


app.get('/logout', function(req, res) {
    //req.session.destroy(function(e){
        req.logout();
        console.log("HEee");
        res.redirect('/');

    //});
});

app.get('/language', function(req, res) {
        res.render('language');
});

app.use((req, res, next) => {
	const error = new Error("Route not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
