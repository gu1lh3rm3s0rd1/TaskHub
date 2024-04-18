// const express = require('express');
// const helmet = require('helmet');
// const path = require('path'); // Pode ser necessário para definir o caminho das views
// const tarefasRouter = require('./routes/tarefas');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/"],
//       styleSrc: ["'self'", "https://cdn.jsdelivr.net/npm/@fullcalendar/"]
//     }
//   }
// }));
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Configuração do EJS
// app.set('view engine', 'ejs');

// // Rotas
// app.use('/tarefas', tarefasRouter);
// app.use('/auth', authRoutes);

// app.get('/', (req, res) => {
//     res.render('index'); // Certifique-se de que 'index.ejs' está corretamente configurado no diretório 'views/'
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });





const express = require('express');
const helmet = require('helmet');
const tarefasRouter = require('./routes/tarefas');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuração do Helmet com CSP apropriado para FullCalendar e outros recursos estáticos
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],  // Permite carregamento de fontes do mesmo domínio
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/"],  // Permite scripts do domínio e do CDN do FullCalendar
      styleSrc: ["'self'", "https://cdn.jsdelivr.net/npm/@fullcalendar/"],  // Permite estilos do domínio e do CDN específico para FullCalendar
      imgSrc: ["'self'", "data:"], // Permite imagens do mesmo domínio e data URLs
      connectSrc: ["'self'"], // Permite conexões WebSocket e AJAX para o mesmo domínio
      frameSrc: ["'self'"] // Permite iframes do mesmo domínio, se necessário
    }
  }
}));

// Servindo arquivos estáticos da pasta public
app.use(express.static('public'));

// Middlewares para parse de JSON e urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS
app.set('view engine', 'ejs');

// Rotas
app.use('/tarefas', tarefasRouter);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.render('index', { title: 'Gerenciador de Tarefas' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
