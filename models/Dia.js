const mongoose = require('mongoose');

const diaSchema = new mongoose.Schema({
    data: Date,
    diaDaSemana: Number,
    feriado: Boolean,
    eventos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento' // Assumindo que você tem um modelo Evento
    }]
});

module.exports = mongoose.model('Dia', diaSchema);
