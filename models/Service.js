const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: false },
  description: { type: String, required: true },
  image: { type: String },
  time_turns: { type: Number, required: true }, // Tiempo en minutos
  professionals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professional' }],
  requires_deposit: { type: Boolean, default: false }, // Requiere seña
  is_virtual: { type: Boolean, default: false }, // Es virtual
  deposit_amount: { type: Number, default: 0 }, // Monto de la seña
  address: { type: String } // Dirección del lugar
});

module.exports = mongoose.model('Service', ServiceSchema);
