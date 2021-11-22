const express = require('express');
const app = express();
const route = require('./routes/router');
require('dotenv').config();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./utils/database');

//cors options
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

//swagger options
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Fidigames API',
            description: 'API Documentation',
            contact: {
                name: 'API'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ['./routes/router.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/",route);

//  sequelize.sync({force: true}).then(result => {
//     console.log(result);
//  }).catch(err => {
//     console.log(err);
//  });
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
}
);
