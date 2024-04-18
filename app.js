const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('passport');
const tarefasRouter = require('./routes/tarefas');
const authRoutes = require('./routes/authRoutes');
const passportConfig = require('./config/passportConfig');

const app = express();

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/mongodb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Configuração do Passport
passportConfig(passport);

// Rotas
app.use('/tarefas', tarefasRouter);
app.use('/auth', authRoutes);

// Iniciando o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
