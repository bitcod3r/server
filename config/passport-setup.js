const passport =require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
    User.get({googleId : googleId}, (user) => {
        done(null, user.googleId);
    })
});

passport.use(
    new GoogleStrategy({
        // options of google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: keys.google.callbackURL
    },(accessToken, refreshToken, profile, done) => {
        // check if user exist
        User.get({googleId: profile.id}, (currentUser) => {
            if(currentUser){
                //already have the user
                console.log('User is: ',currentUser)
                done(null, currentUser);
            }else {
                // create user in our db
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser) => {
                    console.log('New user created' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
)