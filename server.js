const express = require('express');
const app = express();
const route = require('./routes/router');
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./utils/database');

//sequelizemodels
const User = require('./models/User');
const GameCard = require('./models/GameCard');
//passport-jwt
const passport = require('passport');
app.use(passport.initialize());

//ports
let port = process.env.PORT || 3000;
//cors options
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

//swagger options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title:'Fidigames API',
            description:'API Documentation',
            contact: {
                name: 'API'
            },
            servers: [`http://localhost:${port}`]
        }
    },
    apis: ['./routes/router.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/",route);

// GameCard.hasOne(User,{
//     foreignKey: 'user_id',
//     constraints: false,
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });
// User.hasMany(GameCard,{
//     foreignKey: 'user_id',
//     constraints: false,
//     as: 'user'
// });
 sequelize.sync({force: true}).then(result => {
 }).catch(err => {
    console.log(err);
 });

app.listen(port, () => {
    console.log(`Server is running on https://localhost:${port}`);
}
);
