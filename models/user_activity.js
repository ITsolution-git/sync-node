var restful = require('node-restful');
var mongoose = restful.mongoose;
var encrypt = require('../utils/encryption');

// Schema
var userActivitySchema = new mongoose.Schema({
    user_id: {type:String, ref: 'user'},
    activity: String,
    title: String,
    created_at: Date,
    updated_at: Date
});

userActivitySchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// Return model
module.exports = restful.model('useractivity', userActivitySchema);