const Tarefa = require('../models/Tarefa');

// Controladores para CRUD de tarefas
exports.criarTarefa = async (req, res) => {
  try {
    const novaTarefa = new Tarefa(req.body);
    await novaTarefa.save();
    res.status(201).json(novaTarefa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.json(tarefas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.obterTarefaPorId = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.atualizarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletarTarefa = async (req, res) => {
  try {
    const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
