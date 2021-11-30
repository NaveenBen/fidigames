const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const User = require('../models/User')
const GameCard = sequelize.define('gamecard', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    game_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    game_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    game_url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    game_minp: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    game_maxp: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    game_category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    game_likes_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    game_image_url: {
        
        type: Sequelize.STRING,
        allowNull: false
    },
    
});
module.exports = GameCard;