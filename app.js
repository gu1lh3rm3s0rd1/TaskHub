// Importando módulos e configurando o servidor
const express = require('express');
const bodyParser = require('body-parser');
const tarefasRouter = require('./routes/tarefas');
const diasRouter = require('./routes/dias');

require('./db'); // Isso assegura que o banco de dados esteja conectado

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do EJS como engine de template
app.set('view engine', 'ejs');
app.set('views', './views');

// Servindo arquivos estáticos da pasta public
app.use(express.static('public'));

// Rotas
app.use('/tarefas', tarefasRouter);
app.use('/dias', diasRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
