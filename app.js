import express from 'express'
import dotenv from 'dotenv'
import './models/associations.js'
import router from './router.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config()

// Définir la configuration Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'Documentation de mon API',
    },
    tags: [
      {
        name: "Auth",
        description: "API pour l'authentification"
      },
      {
        name: "Utilisateurs",
        description: "API pour les utilisateurs"
      },
      {
        name: "Produits",
        description: "API pour les produits"
      },
    ],
    security: [
      {
        BearerAuth: []
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Entrez le token JWT comme suit: `Bearer <votre_token>`"
        }
      }
    },
    servers: [
      {
        name: 'Localhost Node',
        url: 'http://localhost:3000',
      }
    ],
  },
  apis: ['./routes/*.js'], // Indiquer les fichiers où se trouvent les annotations Swagger
};

// Générer la documentation Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express()
const port = process.env.PORT

// Middleware pour parser le JSON
app.use(express.json())

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

