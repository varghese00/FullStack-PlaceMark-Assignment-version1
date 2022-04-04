import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const stations = await db.stationStore.getAllStations();
      const viewData = {
        name: "Station Dashboard",
        stations: stations,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addStation: {
    handler: async function (request, h) {
      const newStation = {
        name: request.payload.name,
      };
      await db.stationStore.addStation(newStation);
      return h.redirect("/dashboard");
    },
  },
};