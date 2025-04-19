const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: false },
    description: { type: String, required: true },
    image: { type: String },
    time_turns: { type: Number, required: true }, // Tiempo en minutos
    professionals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Professional' }]
});


module.exports = mongoose.model('Service', ServiceSchema);
