var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message:"welcome to tmate-api"});
});

module.exports = router;
