// routes/dias.js

const express = require('express');
const router = express.Router();
const Dia = require('../models/Dia'); // Importe o modelo Dia

router.get('/dias', async (req, res) => {
    try {
        const dias = await Dia.find(); // Consulta todos os dias na coleção
        res.json(dias); // Envie os dias como resposta
    } catch (error) {
        res.status(500).send(error.message); // Em caso de erro, envie uma resposta de erro 500
    }
});

module.exports = router;
