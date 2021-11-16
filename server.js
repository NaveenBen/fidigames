const express = require('express');
const app = express();
const route = require('../fidigamesapi/server/routes/router.js');
const cors = require('cors');
 const sequelize = require('../fidigamesapi/database/utils/database');
 const swaggerJsDoc = require('swagger-jsdoc');
 const swaggerUi = require('swagger-ui-express');
const corsOptions = {
    origin: 'http://localhost:4000',
};

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Fidigames API',
            description: 'Fidigames API Documentation',
            contact: {
                name: 'Naveen Ben',
            },
            servers: ['http://localhost:3000/'],
        },
    },
    apis: ['../fidigamesapi/server/routes/router.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.use(cors(corsOptions));
app.use(express.json());
app.use('/', route);
sequelize.sync().then((result) => {
    console.log('Database is connected');
}).catch((err) => {
console.log(err);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);