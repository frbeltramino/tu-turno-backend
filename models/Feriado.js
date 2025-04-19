const mongoose = require('mongoose');

const FeriadoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        unique: true
    },
    type: {
        type: String,
        default: 'Nacional'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feriado', FeriadoSchema);