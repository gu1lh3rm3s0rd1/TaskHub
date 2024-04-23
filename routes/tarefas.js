const express = require('express');
const router = express.Router();
const tarefasController = require('../controllers/tarefasController');

// Definição das rotas CRUD
router.post('/', tarefasController.criarTarefa);
router.get('/', tarefasController.listarTarefas);
router.get('/:id', tarefasController.obterTarefaPorId);
router.put('/:id', tarefasController.atualizarTarefa);
router.delete('/:id', tarefasController.deletarTarefa);

module.exports = router;
