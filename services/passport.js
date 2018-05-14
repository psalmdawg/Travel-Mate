const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const jwtConfig = require('../jwtConfig');

var localOptions = {
  usernameField: 'email',
}

var localStrategy = new LocalStrategy(localOptions, function(email, password, done){
  User.findOne({email:email.toLowerCase()}, function(err, user){
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    user.comparePassword(password, function(err, isMatch){
      if(err) { return done(err) }
      if(!isMatch) { return done(null, false) }
      return done(null, user)
    });
  });
});

var jwtOptions = {
  secretOrKey: jwtConfig.jwtsecret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
}

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done){
  // console.log('require auth', payload)
  User.findById(payload.sub, function(err, user){
    // console.log(user)
    if(err){return done(err, false)}
    if(user){
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

passport.use(jwtStrategy)
passport.use(localStrategy)
