// controllers/diaController.js

const Dia = require('../models/Dia');

// Obtém todos os dias
exports.getTodosOsDias = async (req, res) => {
    try {
        const dias = await Dia.find();
        res.json(dias);
    } catch (error) {
        res.status(500).send('Erro ao buscar dias: ' + error.message);
    }
};
