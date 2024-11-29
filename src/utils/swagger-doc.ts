import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing users',
    },
    servers: [
      {
        url: 'http://localhost:3000/api', // Base URL for your API
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your route files with Swagger comments
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
