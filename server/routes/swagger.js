const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const setupSwagger = (app) => {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Connect API',
                version: '1.0.0',
                description: 'Esta es una ApiRest para la aplicación ConnectTourism- Este documento tiene como obejetivo ayudar el uso y el mantenimiento'
            },
        },
        apis: ['./routes/*.js'],  // Asegúrate de que el path aquí sea correcto y accesible desde el directorio donde se ejecuta node
    };

    const swaggerSpec = swaggerJsdoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
};

module.exports = setupSwagger;
