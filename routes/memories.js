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
    console.log(result)
    if(err) return next(err);
    res.json(result)
  });
});



var uploadService = multer({
  storage: multer.memoryStorage(),
  // file size limitation in bytes
  // limits: { fileSize: 52428800 },
});


router.post('/new', uploadService.single('theseNamesMustMatch'), (req, res) => {

  var dUri = new Datauri();
  dUri.format(path.extname(req.file.originalname).toString(),req.file.buffer);

  cloudinary.uploader.upload(dUri.content, function (resp) {
    var _memory = new Memory({
      title: req.headers.title,
      image_url: resp.url,
      description: req.headers.description,
      lat:req.headers.lat,
      lng:req.headers.lng
    })

    _memory.save(function (err, result ) {
      if(err){
        res.send(err)
      }
        res.json(result)
      })
  });

})


module.exports = router;
