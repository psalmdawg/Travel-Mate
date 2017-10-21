"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemorySchema = new Schema({
  title: String,
  description: String,
  image_url: String,
  lat:String,
  lng:String

});

var Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;
