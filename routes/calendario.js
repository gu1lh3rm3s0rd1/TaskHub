const express = require('express');
const router = express.Router();

// Suponha que essa função busca dados do calendário
const { getCalendarData } = require('../controllers/calendarioController');

router.get('/data', async (req, res) => {
    try {
        const data = await getCalendarData();
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
