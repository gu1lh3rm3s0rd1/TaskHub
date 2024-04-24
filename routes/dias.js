// // routes/dias.js
const express = require('express');
const router = express.Router();
const Dia = require('../models/Dia');

// router.get('/', (req, res) => {
//     Dia.find({})
//         .then(dias => {
//             res.render('teste2', { dias }); // Certifique-se de que 'teste2' é o nome correto do arquivo EJS na pasta views
//         })
//         .catch(err => {
//             res.status(500).send("Erro ao recuperar dados: " + err);
//         });
// });






router.get('/', async (req, res) => {
    try {
        const dias = await Dia.find({}).sort({ data: 1 });
        const semanas = agruparDiasPorSemana(dias);
        res.render('teste2', { semanas }); // Aqui está passando as semanas corretamente
    } catch (err) {
        res.status(500).send("Erro ao recuperar dados: " + err);
    }
});

// Função para agrupar os dias em semanas
function agruparDiasPorSemana(dias) {
    const semanas = [];
    let semana = [];

    dias.forEach((dia, index) => {
        if (new Date(dia.data).getDay() === 0 && semana.length > 0) {
            semanas.push(semana);
            semana = [];
        }
        semana.push(dia);
        if (index === dias.length - 1) {
            semanas.push(semana);
        }
    });

    return semanas;
}

module.exports = router;