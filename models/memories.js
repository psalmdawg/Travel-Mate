"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemorySchema = new Schema({
  title: String,
  description: String,
  timeStamp:Number,
  image_url: [{
    url:String
  }],
  lat:Number,
  lng:Number

});

var Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;
