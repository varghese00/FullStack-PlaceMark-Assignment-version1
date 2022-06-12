
import bcrypt from "bcrypt";
import Boom from "@hapi/boom";
import { createToken } from "./jwt-utils.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { UserArray,UserSpec,UserSpecPlus,IdSpec,UserCredentialsSpec,JwtAuth } from "../models/joi-schemas.js";

const saltRounds = 10;


export const userApi = {


  authenticate: {
    auth: false,
      handler: async function(request, h) {
      try {
        const {email, password} = request.payload;
        const user = await db.userStore.getUserByEmail(email);
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!user || !passwordsMatch) {
          return Boom.unauthorized("User not found");
        // eslint-disable-next-line no-else-return
        } else if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        } else {
          const token = createToken(user);
          // console.log(token);
          // console.log(user);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate  a User",
    notes: "If user has valid email/password, create and return a JWT token",
    validate:{payload:UserCredentialsSpec,failAction:validationError},
    response:{schema:JwtAuth, failAction:validationError}
  },



  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        user.password = await bcrypt.hash(user.password, saltRounds);
        await db.userStore.addUser(user);
        if (user) {
          // console.log(user);
          // console.log(user._id);

          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },



  find: {
    auth: {
      strategy: "jwt",
      // scope:"admin",
    },    
    handler: async function(request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        console.log(users);
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Dbase Error");
      }
    },
    tags:["api"],
    description: "Get all userApi",
    notes:"Returns details of all userApi",
    response: { schema: UserArray, failAction:validationError }

  },



  findOne: {
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },


  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        await db.userStore.deleteUserById(user._id);
        console.log("user is deleted");
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
    tags: ["api"],
    description: "Delete One User",
    notes: "Remove One User",
  },


  deleteAll: {
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
      try {
        await db.userStore.deleteAll();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all userApi",
    notes: "All userApi removed from StationApi",
  },


  updateUser: { 
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const user = await db.userStore.updateUser(request.payload._id, request.payload);
        if (user) {
          console.log("updated the user")
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error updating user foobar1");
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error foobar2");
      }
    },
    tags: ["api"],
    description: "Update a User",
    notes: "Returns the updated user",
    validate: { payload: UserSpecPlus },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  getLoggedInUser: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);
        if (!loggedInUser) {
          return Boom.notFound("No User with this id");
        }
        return loggedInUser;
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Server Error");
      }
    }
  },



};