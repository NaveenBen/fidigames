require('dotenv').config();
const Sequelize = require('sequelize');
// const sequelize = new Sequelize("fidigamesdb", "fidigames", "naveen786", {
//     host: './dev.sqlite',
//     dialect: 'sqlite',
// });

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: "postgres", 
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        keepAlive: true,        
      },      
      ssl: true,
});

module.exports = sequelize;
