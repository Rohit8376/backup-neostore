const passport = require('passport');
const config = require('../config/default.json');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


//FB
passport.use(new FacebookStrategy({
  clientID: config.APP.FB.CLIENT_ID,
  clientSecret: config.APP.FB.CLIENT_SECRET,
  callbackURL: config.APP.FB.CALLBACK_URL,
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

//Google
passport.use(new GoogleStrategy({
  clientID: config.APP.GOOGLE.CLIENT_ID,
  clientSecret: config.APP.GOOGLE.CLIENT_SECRET,
  callbackURL: config.APP.GOOGLE.CALLBACK_URL,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))