// db.js - aqui é parte de bd, td que for referente a bd, leitura, update, insert, etc..
require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
// const { format } = require("date-fns");

let singleton;


// toda comunicacao com bd node é assincrona, devido a questao de performnace
async function connect() {
  if (singleton) return singleton;

  // conexao com o bd mongo
  const client = new MongoClient(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  });

  try {
    await client.connect();
    // informa qual database
    singleton = client.db(process.env.MONGO_DATABASE);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }

  return singleton;
}


// add uma nova tarefa ao bd
async function insertTarefa(tarefa) {
  const db = await connect();

  return db.collection("tarefas").insertOne(tarefa);
}


// retornar tarefas do bd
async function findTarefa() {
  try {
    const db = await connect();
    const tarefas = await db.collection("tarefas").find().toArray();

    // const tarefasFormatadas = tarefas.map((tarefa) => ({
    //   ...tarefa,
    //   data: format(new Date(tarefa.data), "dd/MM/yyyy"),
    // }));

    return tarefas;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw new Error("Erro ao buscar tarefas do banco de dados");
  }
}


// delete tarefas do bd
async function removeTarefa(id) {
  const db = await connect();

  return db.collection("tarefas").deleteOne({ _id: new ObjectId(id) });
}


// update tarefa do bd
async function updateTarefa(id, titulo, descricao, data, status) {
  const db = await connect();

  return db.collection("tarefas").updateOne(
      { _id: new ObjectId(id) },
      { $set: { titulo, descricao, data, status } }
    );
}


// informa a funcao para a aplicacao
module.exports = {
  connect, 
  ObjectId,
  insertTarefa,
  findTarefa,
  removeTarefa,
  updateTarefa
};
