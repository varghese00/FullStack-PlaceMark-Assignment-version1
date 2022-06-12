import { db } from "../models/db.js";
import {analytics} from "../analytics/analytics-calculation.js"

import { accountsController } from "./accounts-controller.js";


export const adminController = {
  index: {

        auth:{
            strategy:"session",
            scope:["admin"]
        },
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      console.log("users are  ",users)
      console.log("users ids are  ",users._id)

      const stations = await db.stationStore.getAllStations();
      // console.log(stations)
      const locations = await db.locationStore.getAllLocations();
      const mostAddedCounty = await analytics.mostAddedCounty();
      const leastAddedCounty = await analytics.leastAddedCounty();

      const viewData = {
        title: "Application Admin Page",
        user:request.auth.credentials,
        users,
        stations,
        locations,
        mostAddedCounty,
        leastAddedCounty,
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