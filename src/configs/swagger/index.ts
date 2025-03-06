import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import path from "path";

const API_PATHS = [
  path.join(__dirname, "..", "..", "controllers", "*", "*.ts"),
  path.join(__dirname, "..", "..", "routes", "*.ts"),
];

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Meetup API",
      version: "1.0.0",
      description: "API documentation for Meetup application",
    },
  },
  apis: API_PATHS,
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const swaggerUiConfig = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocs),
};
