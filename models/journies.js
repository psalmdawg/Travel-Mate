"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Memory = require('./memories');
const User = require('./user');

const JourneySchema = new Schema({
  title: {
    type:String,
  },
  description: {
    type:String,
  },
  memories:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    }
  ],
  startLocation:{
    type:String,
  },
  endLocation:{
    type:String,
  },
  createdAt:{
    type:Number
  },
  isPublic:{
    type:Boolean,
    default:false
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }

});

var Journey = mongoose.model('Journey', JourneySchema);

module.exports = Journey;
