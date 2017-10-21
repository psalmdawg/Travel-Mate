// var Memory = require('../models/memories');
// var ObjectId = require('mongodb').ObjectId;
// var config = require('../config.js');
// var cloudinary = require('cloudinary');
// var multer = require('multer');
//
// cloudinary.config({
//     cloud_name: config.cloud_name,
//     api_key: config.api_key,
//     api_secret: config.api_secret
// });
//
// const storage = multer.diskStorage({
//   destination: './public/images',
//   filename(req, file, cb) {
//     cb(null, `${new Date()}-${file.originalname}`);
//   },
// });
//
// const upload = multer({ storage });
