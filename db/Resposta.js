const Sequelize  = require("sequelize");
const connection = require("./database");

// Definindo o model
const Resposta = connection.define('respostas', {
    // campos da tabela
    corpo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Envia o model para o banco
Resposta.sync({force: false}).then(() => {
    console.log('Tabela criada!')
});

module.exports = Resposta;