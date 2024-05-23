var express = require("express");
var router = express.Router();
const db = require("../db"); // importa bd

router.get("/", async (req, res, next) => {
  try {
    // Obtenha o número da página da query string, ou 1 se não estiver presente
    // const page = req.query.page ? parseInt(req.query.page) : 1;
    // const pageSize = 5;

    // const semanas = await db.findDias(page, pageSize);
    const tarefas = await db.findTarefa();

    res.render("index", {
      title: "Express",
      tarefas,
      // semanas,
      // currentPage: page,
    });
  } catch (err) {
    res.status(500).send("Erro ao recuperar dados: " + err);
  }
});

// POST
router.post("/save", async (req, res) => {
  // req resgata informaçoes do html
  const tarefa = req.body;
  const result = await db.insertTarefa(tarefa);

  console.log(result);
  // retornar informaçoes (resposta do server ao formulario)
  res.redirect("/");
});

// DELETE
// route.delete("/:id", controller.delete);
router.post("/delete", async (req, res) => {
  // req resgata informaçoes do html
  const id = req.body.id;
  const result = await db.removeTarefa(id);

  console.log(result);
  // retornar informaçoes (resposta do server ao formulario)
  res.redirect("/");
});

// EDIT
// route.put("/:id", controller.update);
router.post("/edit", async (req, res) => {
  // req resgata informaçoes do html
  const id = req.body.id;
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const data = req.body.data;
  const status = req.body.status;
  const result = await db.updateTarefa(id, titulo, descricao, data, status);

  console.log(result);
  // retornar informaçoes (resposta do server ao formulario)
  res.redirect("/");
});

module.exports = router;
