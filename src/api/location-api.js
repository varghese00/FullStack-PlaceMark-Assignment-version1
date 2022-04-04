import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const locationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No location with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.addLocation(request.params.id, request.payload);
        if (location) {
          return h.response(location).code(201);
        }
        return Boom.badImplementation("error creating location");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteAllLocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No location with this id");
        }
        await db.locationStore.deleteLocation(location._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No location with this id");
      }
    },
  },
};