// const express = require('express');
// const router = express.Router();
// const tarefasController = require('../controllers/tarefasController');

// // Rotas para CRUD de tarefas
// router.post('/', tarefasController.criarTarefa);
// router.get('/', tarefasController.listarTarefas);
// router.get('/:id', tarefasController.obterTarefaPorId);
// router.patch('/:id', tarefasController.atualizarTarefa);
// router.delete('/:id', tarefasController.deletarTarefa);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Tarefa = require('../models/Tarefa');

router.post('/', [
    body('titulo').trim().escape(),
    body('descricao').trim().escape(),
    body('data').isISO8601().toDate(),
    body('completo').isBoolean().toBoolean(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const novaTarefa = new Tarefa(req.body);
        await novaTarefa.save();
        res.status(201).json(novaTarefa);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;

