var express = require('express');
var router = express.Router();
var Memory = require('../models/memories');
var ObjectId = require('mongodb').ObjectId;
var config = require('../config.js');
var cloudinary = require('cloudinary');
var multer = require('multer');
var Datauri = require('datauri');
const path = require('path');


var memoriesCtrl = require('../controllers/memories')

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret
});


router.get('/', (req, res) => {
  console.log('get memories')
  Memory.find({}, function (err, result) {
    // console.log(result)
    if(err) return next(err);
    res.json(result)
  });
});


var uploadService = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  // limits: { fileSize: 52428800 },
});


router.post('/new', uploadService.array('theseNamesMustMatch', 10), (req, res) => {

    const memories = [].concat(req.files)
    const posted_URLS = []

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

    Promise.all(mems)
      .then(function() {
        console.log('all dropped)', posted_URLS);
        console.log("@£$@£$@£$ SAVING",posted_URLS);

        var _memory = new Memory({
          title: req.headers.title,
          image_url: posted_URLS,
          timeStamp:new Date().getTime(),
          description: req.headers.description,
          lat:req.headers.lat,
          lng:req.headers.lng
        })

       console.log('memeour',_memory.image_url)

        _memory.save(function (err, result ) {
          if(err){
            console.log(err)
            res.send(err)
          }
            console.log('MEMORY SAVEd, result =>', result)
            res.json(result)
        })
      })
      .catch(console.error);


      // let filePath = memories[i]


    //

    //   //do something with the finalized list of albums here
    // })

    // }




})


module.exports = router;
