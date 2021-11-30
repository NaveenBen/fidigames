const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const jwtv = function (passport) {
     let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader('api-key');
    opts.secretOrKey = 'S3CR3T_K3Y';//jwt secret key
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
         return done(null, jwt_payload);
    }));
};

module.exports = {
    jwtv,
  }