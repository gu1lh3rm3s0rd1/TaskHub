const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// JSON response
// router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the collection
    res.render('index', { users }); // Pass the users to the index view

  } catch (err) {
    res.status(500).send('Error retrieving users');
  }
});


// users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// register
router.post('/auth/register', async (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  // validação
  if (!username || !email || !password || !confirmpassword) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  if (password !== confirmpassword) {
    return res.status(400).send('As senhas não conferem');
  }

  // verificar se o usuário já existe
  const Userexists = await User.findOne({ email: email });
  if (Userexists) {
    return res.status(400).json({ message: 'Usuário já existe, utilize outro e-mail' });
  }

  // criar senha 
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // criar user
  const user = new User({
    username,
    email,
    password: hashedPassword,
    confirmpassword: hashedPassword
  });

  try {
    await user.save();
    res.json(user).send('Usuário registrado com sucesso');

  } catch (error) {
    console.error(error);

    res.status(500).send('Erro ao registrar usuário');
  }
});


// login 
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // validations
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }

  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }

  // check if user exists
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: "Senha inválida" });
  }

  try {
    const secret = process.env.SECRET;

    // jwt valida token
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret
    );

    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ msg: "Erro interno do servidor" });
  }
});


// token validation
function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ msg: "Acesso negado!" });

  try {
    const secret = process.env.SECRET;

    jwt.verify(token, secret);

    next();
  } catch (err) {
    res.status(400).json({ msg: "O Token é inválido!" });
  }
}


// rota privada / se o token for válido, o usuário pode acessar
router.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id;

  // check if user exists
  const user = await User.findById(id).select('-password -confirmpassword');

  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  res.status(200).json({ user });
});


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = router;
