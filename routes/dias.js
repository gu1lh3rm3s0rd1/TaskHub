// // routes/dias.js
// const express = require('express');
// const router = express.Router();
// const Dia = require('../models/Dia');

// router.get('/', async (req, res) => {
//     try {
//         const currentYear = new Date().getFullYear();
//         const nextYear = currentYear + 1;
//         const startDate = new Date(currentYear, 0, 1); // Primeiro dia do ano atual
//         const endDate = new Date(nextYear, 11, 31); // Último dia do ano seguinte

//         const dias = await Dia.find({
//             data: { $gte: startDate, $lte: endDate }
//         }).sort({ data: 1 });

//         const semanas = agruparDiasPorSemana(dias);
//         res.render('teste2', { semanas }); // Aqui está passando as semanas corretamente
//     } catch (err) {
//         res.status(500).send("Erro ao recuperar dados: " + err);
//     }
// });

// // Função para agrupar os dias em semanas
// function agruparDiasPorSemana(dias) {
//     const semanas = [];
//     let semana = [];

//     dias.forEach((dia, index) => {
//         if (new Date(dia.data).getDay() === 0 && semana.length > 0) {
//             semanas.push(semana);
//             semana = [];
//         }
//         semana.push(dia);
//         if (index === dias.length - 1) {
//             semanas.push(semana);
//         }
//     });

//     return semanas;
// }

// module.exports = router;


// routes/dias.js
const express = require('express');
const router = express.Router();
const Dia = require('../models/Dia');

router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1; // Página atual
        const daysPerPage = 35; // Dias por página

        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;
        const startDate = new Date(currentYear, 0, 1); // Primeiro dia do ano atual
        const endDate = new Date(nextYear, 11, 31); // Último dia do ano seguinte

        const dias = await Dia.find({
            data: { $gte: startDate, $lte: endDate }
        })
            .sort({ data: 1 })
            .skip((page - 1) * daysPerPage) // Ignora os dias das páginas anteriores
            .limit(daysPerPage); // Limita a quantidade de dias por página

        const semanas = agruparDiasPorSemana(dias);
        res.render('teste2', { semanas, currentPage: page }); // Passa a página atual para o template
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
