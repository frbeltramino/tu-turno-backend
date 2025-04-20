const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TurnoSchema = new Schema({
  day: {
    type: String,
    required: true
  },
  start_hour: {
    type: String,
    required: true
  },
  end_hour: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  client_name: {
    type: String,
    required: true
  },
  client_phone: {
    type: String,
    required: true
  },
  client_email: {
    type: String,
    required: true,
  },
  professional_id: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true
  },
  professional_name: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    required: true
  },
  service_name: {
    type: String,
    required: true
  },
  is_cancelled: {
    type: Boolean,
    default: false
  },
  is_completed: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  }
});

module.exports = model('Turno', TurnoSchema);