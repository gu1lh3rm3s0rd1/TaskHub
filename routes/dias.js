// routes/dias.js
const express = require('express');
const router = express.Router();
const Dia = require('../models/Dia');

router.get('/', (req, res) => {
    Dia.find({})
        .then(dias => {
            res.render('teste2', { dias }); // Certifique-se de que 'teste2' é o nome correto do arquivo EJS na pasta views
        })
        .catch(err => {
            res.status(500).send("Erro ao recuperar dados: " + err);
        });
});

module.exports = router;
