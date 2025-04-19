const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const OtpSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  idUsuario: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Otp', OtpSchema);