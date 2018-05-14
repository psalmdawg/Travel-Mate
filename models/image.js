"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Memory = require('./memories');
const User = require('./user');
const Journey = require('./journies');

const ImageSchema = new Schema({
  timeStamp: Number,
  image_url: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  memory:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Memory'
  },
  journey:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journey'
  }
});

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
