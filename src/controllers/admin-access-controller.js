import { db } from "../models/db.js";
import { userAnalytics } from "../analytics/user-analytics.js";

import { accountsController } from "./accounts-controller.js";


export const adminController = {

  
  index: {

        auth:{
            strategy:"session",
            // scope:["admin"]
        },
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const stations = await db.stationStore.getAllStations();
      const locations = await db.locationStore.getAllLocations();
      const analytics = await userAnalytics.calculateUserAnalytics();
      const viewData = {
        title: "Application Admin Page",
        user:request.auth.credentials,
        users: users,
        stations: stations,
        locations: locations,
        analytics: analytics,
      };
      return h.view("admin-access-view", viewData);
    },
  },


  deleteUser: {
    auth:{
      strategy:"session",
      scope:["admin"]
  },
    handler: async function (request, h) {
      const user = await db.userStore.getUserById(request.params.id);
      await db.userStore.deleteUserById(user._id);
      return h.redirect("/admin-access");
    },
  },
};