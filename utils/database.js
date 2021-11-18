require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize("fidigamesdb", "fidigames", "naveen786", {
    host: './dev.sqlite',
    dialect: 'sqlite',
});

module.exports = sequelize;
