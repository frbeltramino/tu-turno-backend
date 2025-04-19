const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RegisterOtpSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('otpRegister', RegisterOtpSchema);