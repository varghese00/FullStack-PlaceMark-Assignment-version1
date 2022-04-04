import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: LocationSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const station= await db.stationStore.getStationById(request.params.id);
          return h.view("station-view",{title: "Error adding location",station:station,errors:error.details}).takeover().code(400);
        
      },
    },
    handler: async function (request, h) {
      const station = await db.stationStore.getStationById(request.params.id);
      const newLocation = {
        name: request.payload.name,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category:request.payload.category,
        description:request.payload.description,
      };
      await db.locationStore.addLocation(station._id, newLocation);
      return h.redirect(`/station/${station._id}`);
    },
  },

  deleteLocation: {
    handler: async function(request, h) {
      const station = await db.stationStore.getStationById(request.params.id);
      await db.locationStore.deleteLocation(request.params.locationid);
      return h.redirect(`/station/${station._id}`);
    },
  },
};