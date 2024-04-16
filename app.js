const express = require('express');
const bodyParser = require('body-parser');
const Tarefa = require('./models/tarefas');
require('./db'); // Inclui a configuração do banco de dados

const app = express();
app.use(bodyParser.json());

// Rota para criar uma tarefa
app.post('/tarefas', async (req, res) => {
    try {
        const tarefa = new Tarefa(req.body);
        await tarefa.save();
        res.status(201).send(tarefa);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota para obter todas as tarefas
app.get('/tarefas', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.status(200).send(tarefas);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Rota para editar uma tarefa
app.patch('/tarefas/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarefa) {
            return res.status(404).send();
        }
        res.send(tarefa);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota para deletar uma tarefa
app.delete('/tarefas/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findByIdAndDelete(req.params.id);
        if (!tarefa) {
            return res.status(404).send();
        }
        res.send(tarefa);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
