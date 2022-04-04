import { db } from "../models/db.js";
import { StationSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: StationSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Station error", errors: error.details }).takeover().code(400);
      },
    },
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