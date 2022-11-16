const Sequelize  = require("sequelize");
const connection = require("./database");

// Definindo o model
const Pergunta = connection.define('perguntas', {
    // campos da tabela
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

// Envia o model para o banco
Pergunta.sync({force: false}).then(() => {
    console.log('Tabela pergunta criada!')
});

module.exports = Pergunta;