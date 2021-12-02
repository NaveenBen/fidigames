require('dotenv').config();
const Sequelize = require('sequelize');
// const sequelize = new Sequelize("fidigamesdb", "fidigames", "naveen786", {
//     host: './dev.sqlite',
//     dialect: 'sqlite',
// });

const sequelize = new Sequelize(DATABASE_URL,{
    dialect: 'postgres',
    protocol: 'postgres',
});

module.exports = sequelize;
