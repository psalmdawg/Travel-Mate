var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportService = require('../services/passport');
const authCtrl = require('../controllers/authController')

var requireAuth = passport.authenticate('jwt', {session:false});
var requireLogin = passport.authenticate('local', {session:false});

function protected(req, res, next){
  res.send('this is the secret, from protected route')
}
 

router.get('/protected', requireAuth, protected)


router.post('/signup', authCtrl.signup)


router.post('/signin', requireLogin, authCtrl.signin)


module.exports = router;
