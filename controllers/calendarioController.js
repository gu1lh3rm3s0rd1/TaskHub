const getCalendarData = async () => {
    // Suponha que você tenha alguma lógica para buscar ou gerar dados de calendário
    return {
        year: new Date().getFullYear(),
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    };
};

module.exports = { getCalendarData };
