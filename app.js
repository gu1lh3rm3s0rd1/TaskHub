// Importando módulos e configurando o servidor
const express = require('express');
const bodyParser = require('body-parser');
const tarefasRouter = require('./routes/tarefas');
const calendarRoutes = require('./routes/calendario');
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
app.use('/api/calendar', calendarRoutes);
app.use('/dias', diasRouter);
app.get('/', (req, res) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth(); // Mês atual (0-11)

  // Calcula o número de dias no mês
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Gerar array de dias [1, 2, ..., daysInMonth]
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  res.render('teste2', { year, month, days, title: 'Calendário' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
