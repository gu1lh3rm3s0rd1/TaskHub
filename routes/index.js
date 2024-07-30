const express = require("express");
const router = express.Router();
const db = require("../db"); // importa bd
const User = require('../models/user');


// GET
router.get("/", async (req, res, next) => {
  try {
    const tarefas = await db.findTarefa();
    const users = await User.find();

    res.render("index", {
      title: "Express",
      tarefas,
      user: users.length > 0 ? users[0] : null
    });
  } catch (err) {
    res.status(500).send("Erro ao recuperar dados: " + err);
  }
});


// POST
router.post("/save", async (req, res) => {
  const { titulo, descricao, data, status, userId } = req.body;

  // Verifique se o usuário existe
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send("Usuário não encontrado");
  }

  // Criar nova tarefa
  const tarefa = {
    titulo,
    descricao,
    data,
    status,
    user: userId
  };

  const result = await db.insertTarefa(tarefa);
  console.log(result);
  res.redirect("/");
});


// DELETE
router.post("/delete", async (req, res) => {
  const id = req.body.id;
  const result = await db.removeTarefa(id);
  console.log(result);
  res.redirect("/");
});


// EDIT
router.post("/edit", async (req, res) => {
  const { id, titulo, descricao, data, status, userId } = req.body;

  // Verifique se o usuário existe
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).send("Usuário não encontrado");
  }

  const result = await db.updateTarefa(id, titulo, descricao, data, status, userId);
  console.log(result);
  res.redirect("/");
});


// API
router.get('/tarefas', async (req, res) => {
  try {
    const tarefas = await db.findTarefa();
    res.json(tarefas);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
