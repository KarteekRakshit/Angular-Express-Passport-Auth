const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');
const jwt = require('jsonwebtoken');


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
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                //console.log('user isBefore Token: ', currentUser);
                //let payload = {subject: currentUser.id}
                //console.log('Payload:',payload)
                //let tokend = jwt.sign(payload, 'secretKey')
                //console.log('tokend:',tokend)
                //currentUser['token']={tokend}
                //console.log('user isAfter Token: ', currentUser);

                done(null, currentUser);
                
            } else {
                // if not, create user in our db

                let payload = {subject: profile.id}
                let tokend = jwt.sign(payload, 'secretKey')
                console.log('TokenBeforAppending:',token )
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.image.url,
                    token: tokend
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
);
