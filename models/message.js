var restful = require('node-restful');
var mongoose = restful.mongoose;
var encrypt = require('../utils/encryption');

// Schema
var messageSchema = new mongoose.Schema({
    room_id: String,
    from: String,
    to: String,
    body: String,
    expire: Date,
    is_read: Boolean,
    created_at: Date,
    updated_at: Date
});

messageSchema.pre('save', function(next) {
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
module.exports = restful.model('message', messageSchema);