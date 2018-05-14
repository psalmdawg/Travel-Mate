"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const validateEmail= (email) => {
  return (/\S+@\S+\.\S+/).test(email)
}
const UserSchema = new Schema({
  email:{
    type: String,
    unique: true,
    lowercase: true,
    required: 'Email address is required',
    validate:[validateEmail, 'Please enter a valid email']
  },
  password:{
    type:String,
    required: true
  },
  timeStamp:Number,
  firstName:{
    type:String,
  },
  lastName:{
    type:String
  },
  dob:{
    type:String
  },
  mobile:{
    type:String
  },
  createdAt:{
    type:String
  }

});

UserSchema.pre('save', function(next){
  var user = this;
  if(user.isNew || user.isModified){
    bcrypt.genSalt(11, function(err, salt){
      if(err){ return next(err) }
      bcrypt.hash(user.password, salt, null, function(err, hash){
        if(err){ return next(err) }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err){ return callback(err) }
    callback(null, isMatch);
  })
}

var User = mongoose.model('User', UserSchema);

module.exports = User;
