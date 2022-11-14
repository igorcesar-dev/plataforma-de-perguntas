const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', '231113', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;