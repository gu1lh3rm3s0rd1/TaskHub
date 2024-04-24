// models/Dia.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const diaSchema = new Schema({
  data: Date,
  diaDaSemana: Number,
  feriado: Boolean,
  eventos: Array
});

const Dia = mongoose.model('Dia', diaSchema);

module.exports = Dia;

