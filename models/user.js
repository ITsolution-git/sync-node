var restful = require('node-restful');
var mongoose = restful.mongoose;
var encrypt = require('../utils/encryption');

// Schema
var userSchema = new mongoose.Schema({
    userId: String,
    first_name: String,
    last_name: String,
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    salt: String,
    admin: Boolean,
    education_level: String,
    college_name: String,
    passion: String,
    goals: String,
    created_at: Date,
    updated_at: Date,
    image: String,
    type: String, // recruiter, business_owner, job_seeker
    location: String, 
    linkedin: String
});

userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

userSchema.methods = {
  authenticate: function(pwdToMatch) {
    return encrypt.hashPwd(this.salt, pwdToMatch) === this.password;
  }
};

// Return model
module.exports = restful.model('user', userSchema);