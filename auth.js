const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const dotenv = require('dotenv');
dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

passport.use(new SpotifyStrategy({
  clientID: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:8888/callback',
},
  function (accessToken, refreshToken, expires_in, profile, done) {
    return done(null, { accessToken, profile });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;