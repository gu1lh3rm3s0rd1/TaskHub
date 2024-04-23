// models/Tarefa.js
const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String,
    data: { type: Date, required: true },
    status: { type: String, enum: ['completa', 'pendente'], default: 'pendente' }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
