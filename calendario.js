// No topo do arquivo populateCalendar.js
const mongoose = require('mongoose');
const Dia = require('./models/Dia');

mongoose.connect('mongodb://localhost:27017/mongodb');

const popularCalendario = async () => {
    const startYear = 2023;
    const endYear = 2030;
    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month < 12; month++) {
            const numDays = new Date(year, month + 1, 0).getDate();
            for (let day = 1; day <= numDays; day++) {
                const data = new Date(year, month, day);
                const diaDaSemana = data.getDay();
                const novoDia = new Dia({
                    data: data,
                    diaDaSemana: diaDaSemana,
                    feriado: false // Lógica para feriados pode ser adicionada aqui
                });
                await novoDia.save();
            }
        }
    }
    console.log('Calendário populado com sucesso!');
    mongoose.disconnect();
};

popularCalendario().catch(err => console.error('Erro ao popular calendário:', err));
