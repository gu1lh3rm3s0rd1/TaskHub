const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
    data: { type: Date, required: true },
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    completo: { type: Boolean, default: false }
});

module.exports = mongoose.model('Tarefa', TarefaSchema);
