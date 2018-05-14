"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const MemorySchema = new Schema({
  title: String,
  description: String,
  timeStamp: Number,
  image_url: [{
    url: String
  }],
  lat: Number,
  lng: Number,
  location: String,
  isPublic:{
    type: Boolean,
    default: false
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});

var Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;
