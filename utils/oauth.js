const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

module.exports = function (passport){
    passport.use(new GoogleStrategy({
    clientID:     '720681694690-3a4pbnrtn3h8rv2mj90sa44qc6i1mhgm.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://fidigamesapi.herokuapp.com/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
     return done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
    }
);

passport.deserializeUser(function(user, done) {
    done(null, user);
    }
);
}