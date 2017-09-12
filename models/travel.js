var restful = require('node-restful');
var mongoose = restful.mongoose;
var encrypt = require('../utils/encryption');

// Schema
var travelSchema = new mongoose.Schema({
    user_id: String,
    description: String,
    url: String,
    location: String,
    country: String, 
    continent: String,
    category: String,
    date: String,
    latlng: [Number],
    created_at: Date,
    updated_at: Date
});

travelSchema.pre('save', function(next) {
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
module.exports = restful.model('travel', travelSchema);