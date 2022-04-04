import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const stations = await db.stationStore.getUserStations(loggedInUser._id);
      const viewData = {
        name: "Station Dashboard",
        stations: stations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addStation: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newStation = {
        userid: loggedInUser._id,
        name: request.payload.name,
      };
      await db.stationStore.addStation(newStation);
      return h.redirect("/dashboard");
    },
  },

  deleteStation: {
    handler: async function (request, h) {
      const station = await db.stationStore.getStationById(request.params.id);
      await db.stationStore.deleteStationById(station._id);
      return h.redirect("/dashboard");
    },
  },
};