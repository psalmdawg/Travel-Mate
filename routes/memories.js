var express = require('express');
var router = express.Router();
var Memory = require('../models/memories');
var Journey = require('../models/journies');

const passport = require('passport');
const passportService = require('../services/passport');
var requireAuth = passport.authenticate('jwt', {session:false});

router.get('/', requireAuth,(req, res) => {
  console.log('get memories')
  Memory.find({}, function (err, result) {
    if(err) return next(err);
    res.json(result)
  });
});


router.get('/:id', requireAuth, (req, res) => {
  // console.log('get mem',req.body)
  Memory.findById(req.params.id, (err, memory) => {
    if (err) {
      res.send(err);
    }
    // console.log(memory)
    res.json(memory)
  })

})

router.post('/update/:id', requireAuth, function(req, res){
  console.log('$&*@($&£$*@£$&@£(@$*  memory post timeSTAMP ', req.body.timeStamp)
  var title = req.body.title;
  var description = req.body.description;
  var lat = req.body.lat;
  var lng = req.body.lng;
  var location = req.body.location;
  var timeStamp = req.body.timeStamp;

  Memory.update(
    { "_id" : req.params.id },
    { "$set": {
      title: title,
      description: description,
      location:location,
      lat:lat,
      lng:lng,
      timeStamp:timeStamp
    }},

    function (err, memory) {
      if (err){
        console.log("there is an error: " + err)
      } else {
        res.status(200).json({
          message: 'Success',
          obj: memory
        });
      }
    }
  )
});


router.delete('/:journeyId/:memId',  (req,res)=>{
  console.log(req.params.journeyId)
  console.log(req.params.memId)


  //finds relevant journey and deletes memory reference
  Journey.update(
    { "_id" : req.params.journeyId },
    { "$pull": { memories: req.params.memId  } },
    function (err, doc) {
      if (err){
        console.log("there is an error: " + err)
      } else {
        res.status(200).json({
          message: 'Success',
          obj: doc
        });
      }
    }
  )

  Memory.findByIdAndRemove(id, function(err, memory) {
    if (err)
      throw err;

    if (!memory) {
      return res.status(404).json({
        message: 'Could not delete memory'
      });
    }

    res.json({
      result: 'Memory was deleted'
    });

  });

})


module.exports = router;
