const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('billing_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', 
});

module.exports = sequelize;