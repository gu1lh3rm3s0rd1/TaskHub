const express = require('express');
const router = express.Router();

// Defina as rotas aqui
router.get('/', (req, res) => {
    res.send('Auth Route');
});

module.exports = router;
