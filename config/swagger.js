import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Définir les options de configuration Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Mon API",
      version: "1.0.0",
      description: "Documentation de mon API",
    },
    tags: [
      { name: "Auth", description: "API pour l'authentification" },
      { name: "Utilisateurs", description: "API pour les utilisateurs" },
      { name: "Produits", description: "API pour les produits" },
    ],
    security: [{ BearerAuth: [] }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "Entrez le token JWT comme suit: `Bearer <votre_token>`",
        },
      },
    },
    servers: [{ name: "Localhost Node", url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

// Initialiser Swagger avec Express
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
