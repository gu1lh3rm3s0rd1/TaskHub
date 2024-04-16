const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conectado ao MongoDB com sucesso!");
});

module.exports = db;
