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
  },
  requires_deposit: {
    type: Boolean,
    default: false
  },
  is_confirmed: {
    type: Boolean,
    default: false
  },
  is_virtual: {
    type: Boolean,
    default: false
  },
  meet_link: {
    type: String,
    required: false
  },
  service_id: {
    type: String,
    required: true,
  },
   deposit_amount: { 
    type: Number,
    default: 0 
  },
  deposit_paid_amount: {
    type: Number,
    default: 0
  },
  professional_email: {
    type: String,
    required: false
  },
  professional_phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
 },
});

module.exports = model('Turno', TurnoSchema);