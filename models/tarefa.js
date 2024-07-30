const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);

module.exports = Tarefa;