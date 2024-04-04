const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  swaggerDefinition: {
    restapi: "3.1.0",
    info: {
      title: "cs732-careless-crayfish api",
      version: "1.0.0",
      description: "cs732-careless-crayfish API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./controllers/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
