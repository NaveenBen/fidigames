const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const gameCard = require('../models/GameCard')
const User = sequelize.define('user', {
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = User;