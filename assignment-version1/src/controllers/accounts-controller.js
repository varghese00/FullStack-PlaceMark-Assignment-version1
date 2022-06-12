import { db } from "../models/db.js";
import { UserSpec,UserCredentialsSpec,UserSpecPlus } from "../models/joi-schemas.js";

export const accountsController = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to Charging Stations" });
    },
  },

  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for Charging Stations" });
    },
  },

  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options:{abortEarly:false},
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error",errors:error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to Stations" });
    },
  },

  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      // const users=await db.userStore.getAllUsers();
      // const user=await db.userStore.getUserByRole(email)
      const user = await db.userStore.getUserByEmail(email);
    
      if ( !user || user.password !== password ) {
        return h.redirect("/");
      }
      
      request.cookieAuth.set({ id: user._id,scope:user.role,role:user.role,email:user.email
      });
      return h.redirect("/dashboard");


    },
  },

  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async getLoggedInUser(request){
    const loggedInUser=request.auth.credentials;
    return loggedInUser._id;
  },


  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { valid: false };
    }
    return { valid: true, credentials: user };
  },


  

  loggedInUserDetails: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const user = await db.userStore.getUserById(loggedInUser._id);
      const viewData = {
        title: "User Account",
        user: user,
      };
      return h.view("user-account-view", viewData);
    },
  },

  updateLoggedInUser: {
    validate: {
      payload: UserSpecPlus,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("user-account-view", { title: "Error", errors: error.details }).takeover.code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };
      try {
        await db.userStore.updateUser(loggedInUser._id, updatedUser);
      } catch (error) {
        console.log(error);
      }
      return h.view("login-view");
    },
  },


  deleteUserAccount: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let userStations = [];
      userStations = await db.stationStore.getUserStations(loggedInUser._id);
      for (let i = 0; i < userStations.length; i += 1) {
        let userLocations = [];
        // eslint-disable-next-line no-await-in-loop
        userLocations = await db.locationStore.getLocationsByStationId(userStations[i]._id);
        for (let j = 0; j < userLocations.length; j += 1) {
          // eslint-disable-next-line no-await-in-loop
          await db.locationStore.deleteLocation(userLocations[j]._id);
        }
        // eslint-disable-next-line no-await-in-loop
        await db.stationStore.deleteStationById(userStations[i]._id);
      }
      await db.userStore.deleteUserById(loggedInUser._id);
      return h.redirect("/");
    },
  },



};