const User = require('../models/user');
const jwt = require('jwt-simple');
const jwtConfig = require('../jwtConfig');
 
//function to create the token
function tokenForUser(user){
  console.log('$$$',user)
 var timeStamp = new Date().getTime()
 return jwt.encode({
   sub: user._id,
   iat: timeStamp,

 }, jwtConfig.jwtsecret )
}

exports.signin = function(req, res, next){
  var user = req.user;
  res.send({token: tokenForUser(user), user_id: user._id})
}

exports.signup = function(req, res, next){
  var timeStamp = new Date().getTime()
  var email = req.body.email;
  var password = req.body.password;

  if(!email || !password){
    return res.status(422).send({error: "You must provide and email and password"})
  }

  //check to see if user exists
  User.findOne({email:email}, function(err, existingUser){
    if(err) { return next(err); }
    
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
      
    var user = new User({
      email: email,
      password: password,
      createdAt: timeStamp
    })
    
    user.save(function(err){
      if(err) { console.log(err) }
      res.json({ user_id: user._id, token:tokenForUser(user) })
    })
  })
}
