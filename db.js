require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const { MongoClient, ObjectId } = require("mongodb");
let singleton;


async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  });

  try {
    await client.connect();
    singleton = client.db(process.env.MONGO_DATABASE);
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err);
    throw err;
  }

  return singleton;
}


async function insertTarefa(tarefa) {
  const db = await connect();
  return db.collection("tarefas").insertOne(tarefa);
}


async function findTarefa() {
  try {
    const db = await connect();
    const tarefas = await db.collection("tarefas").find().toArray();
    return tarefas;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw new Error("Erro ao buscar tarefas do banco de dados");
  }
}


async function removeTarefa(id) {
  const db = await connect();
  return db.collection("tarefas").deleteOne({ _id: new ObjectId(id) });
}


async function updateTarefa(id, titulo, descricao, data, status, userId) {
  const db = await connect();
  return db.collection("tarefas").updateOne(
    { _id: new ObjectId(id) },
    { $set: { titulo, descricao, data, status, user: new ObjectId(userId) } }
  );
}


module.exports = {
  connect,
  ObjectId,
  insertTarefa,
  findTarefa,
  removeTarefa,
  updateTarefa
};
