import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie"
import dotenv from "dotenv"
import Joi from "joi";
import Inert from "@hapi/inert"
import HapiSwagger from "hapi-swagger";
import jwt from "hapi-auth-jwt2";
import { validate } from "./api/jwt-utils.js";



import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { Admin } from "./models/mongo/admin.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });

  const result= dotenv.config();
  if (result.error){
    console.log(result.error.message);
    // process.exit(1)
  }


  const swaggerOptions={
    info:{
      title: "Electric Charging Station API",
      version:"0.1"
    },
    securityDefinitions: {
      jwt: {
        type: "apiKey",
        name: "Authorization",
        in: "Header"
      }
    },
    security: [{ jwt: [] }]
}


  await server.register(Vision);
  await server.register(Cookie);
  server.validator(Joi)



  await server.register(Inert);
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);



  await server.register(jwt);
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });




  // auth strategy for cookies
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validateFunc: accountsController.validate,
  });
  server.auth.default("session");

// handlebars views rendering
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

// mongo must be added here and also inititated in .env
  db.init("mongo")
  server.route(webRoutes);
  server.route(apiRoutes)
  await server.start();
  console.log("Server running on %s", server.info.uri);
  console.log(Admin())

}


process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});




init();