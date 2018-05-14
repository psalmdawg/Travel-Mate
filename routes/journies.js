const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const Memory = require('../models/memories');
const ObjectId = require('mongodb').ObjectId;
const config = require('../config.js');
const cloudinary = require('cloudinary');
const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');
const passport = require('passport');
const passportService = require('../services/passport');

const Journey = require('../models/journies');
const Image = require('../models/image');


const requireAuth = passport.authenticate('jwt', {session:false});

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});

var uploadService = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  // limits: { fileSize: 52428800 },
});

//return list of journies associated by user id
router.get('/', requireAuth, (req, res) => {

  // console.log('!~ getting journies ~!', req.query)

  Journey.find({ user: req.query.user_id}, (err, result)=>{
    if (err) return next(err);
    res.json(result)
  })
})


//post new journey
router.post('/new', requireAuth, (req, res)=>{

  let _journey = new Journey({
    title: req.body.title,
    description: req.body.description,
    createdAt:req.body.createdAt,
    user:req.body.user_id,
    startLocation:req.body.startLocation,
    endLocation:req.body.endLocation,
    createdAt:req.body.createdAt
  })


  _journey.save(function (err, result ) {
    if(err){
      res.send(err)
    }
    res.json(result)
  })
})

//get individual journies
router.get('/:id', requireAuth, (req, res)=>{
  Journey.findById(req.params.id, (err, journey) => {

    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }

    res.status(200).json({
      message: 'Success',
      obj: journey
    });

  });
})


router.post('/update/:id', requireAuth, function(req, res){
  // console.log('journey post ', req.body)
  var title = req.body.title;
  var description = req.body.description;

  Journey.update(
    { "_id" : req.params.id },
    { "$set": {
      title: title,
      description: description
    }},

    function (err, journey) {
      if (err){
        console.log("there is an error: " + err)
      } else {
        res.status(200).json({
          message: 'Success',
          obj: journey
        });
      }
    }
  )
});

//upload for memories to journies
//post images to the cloud storing a reference in mongo. memories are sotred as a reference in their parent journey model
router.post('/newMemory/:id', requireAuth, uploadService.array('theseNamesMustMatch', 10), (req, res) => {

  Journey.findById(req.params.id, (err, journey) => {
    if (err) {
      res.send(err);
    }

    const memories = [].concat(req.files)
    const posted_URLS = []

    //set the memories as promises
    var mems = memories.map((memory)=>{
      return new Promise(function(resolve, reject) {

        var dUri = new Datauri();
        dUri.format(path.extname(memory.originalname).toString(),memory.buffer);
        return cloudinary.uploader.upload(dUri.content, function (resp) {
          console.log(resp.url)
          posted_URLS.push({url:resp.url})
          resolve();
        })

      })
    })

    // use resolved promises
    Promise.all(mems)
      .then(function() {

        var _memory = new Memory({
          title: req.headers.title,
          image_url: posted_URLS,
          timeStamp:new Date().getTime(),
          description: req.headers.description,
          lat:req.headers.lat,
          lng:req.headers.lng,
          user:req.headers.user,
          location:req.headers.location
        })

        _memory.save(function (err, result ) {
          if(err){
            console.log(err)
            res.send(err)
          }
          journey.memories.push(_memory)
          journey.save(err => {
            if (err) {
              res.send(err);
            }
            res.json({
              message: 'mem assigned successfully',
              data:_memory
            });
          });

        })
      })
      .catch(console.error);

    })

})


router.delete('/:id', requireAuth, (req,res)=>{

  Journey.findByIdAndRemove(req.params.id, function(err, journey) {
    if (err)
      throw err;

    if ( !journey) {
      return res.status(404).json({
        message: 'Could not delete journey'
      });
    }

    res.json({
      result: 'Journey was deleted'
    });

  });

})

module.exports = router;
