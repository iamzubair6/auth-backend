const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Authentication API',
            version: '1.0.0',
            description: 'Node.js Express API with JWT Authentication using Prisma',
            contact: {
                name: 'Zubair Rahman',
                email: 'zubair.rahman89@gmail.com',
                url: 'https://github.com/iamzubair6',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to your API routes
};

module.exports = swaggerOptions;
