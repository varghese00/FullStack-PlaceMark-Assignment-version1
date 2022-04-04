import { db } from "../models/db.js";

export const stationController = {
  index: {
    handler: async function (request, h) {
      const station = await db.stationStore.getStationById(request.params.id);
      const viewData = {
        name: "Station",
        station: station,
      };
      return h.view("station-view", viewData);
    },
  },

  addLocation: {
    handler: async function (request, h) {
      const station = await db.stationStore.getStationById(request.params.id);
      const newLocation = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.locationStore.addLocation(station._id, newLocation);
      return h.redirect(`/station/${station._id}`);
    },
  },
};