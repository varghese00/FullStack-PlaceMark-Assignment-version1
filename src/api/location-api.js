import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, LocationSpec, LocationSpecPlus,LocationArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";


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
    tags: ["api"],
    response: { schema: LocationArraySpec, failAction: validationError },
    description: "Get all locationApi",
    notes: "Returns all locationApi",
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
    tags: ["api"],
    description: "Find a Location",
    notes: "Returns a location",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LocationSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Create a location",
    notes: "Returns the newly created location",
    validate: { payload: LocationSpec },
    response: { schema: LocationSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all locationApi",
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
    tags: ["api"],
    description: "Delete a location",
    validate: { params: { id: IdSpec }, failAction: validationError },

  },
};