const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const mongoose = require('mongoose');


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});



passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: "113181506541-b30rfgta9u434ahutkkkubi08pg0rugm.apps.googleusercontent.com" ,
        clientSecret:"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",
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        console.log("hi");
        User.findOne({googleId: profile.id}).then((currentUser) => {
            console.log("hi111");
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
					_id: new mongoose.Types.ObjectId(),
                    googleId: profile.id,
                    name: profile.displayName,
                    email:profile._json.email
                }).save().then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

