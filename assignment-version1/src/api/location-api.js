import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, LocationSpec, LocationSpecPlus,LocationArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";


export const locationApi = {
  find: {
    auth: {
      strategy: "jwt",
    },    
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return await Promise.all(locations);
      } 
      catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: LocationArraySpec, failAction: validationError },
    description: "Get all locationApi",
    notes: "Returns all locationApi",
  },


  findLocationsByStationId: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const location = await db.locationStore.getLocationsByStationId(request.params.id);
        if (!location) {
          return Boom.notFound("No location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No location with this id");
      }
    },
    tags: ["api"],
    description: "Find a location",
    notes: "Returns a Location",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LocationArraySpec, failAction: validationError },
  },



  findOne: {
    auth: {
      strategy: "jwt",
    },    
    async handler(request) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No location with this id");
        }
        console.log("Location is ", location)
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
    auth: {
      strategy: "jwt",
    },    
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
    auth: {
      strategy: "jwt",
    },    
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
    auth: {
      strategy: "jwt",
    },    
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


  updateLocation: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.updateLocation(request.params.locationid, request.payload);
        if (location) {
          return h.response(location).code(201);
        }
        return Boom.badImplementation("Error Creating Location");
      } catch (err) {
        console.log(err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update Location",
    notes: "Updated Location",
    validate: { payload: LocationSpecPlus },
    response: { schema: LocationSpecPlus, failAction: validationError },
  },


  uploadImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const location = await  db.locationStore.getLocationById(request.params.id);
        console.log("Uploading Charger Pic",location);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const response = await imageStore.uploadImage(request.payload.imagefile);
          location.images.push({img : response.url,
            imgid: response.public_id})
          db.locationStore.updateLocation(location._id, location);
        }
        return h.response().code(200);
      } catch (err) {
        console.log(err);
        return h.response().code(500);
      }
    },
    tags: ["api"],
    description: "Upload Charger Pic",
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },


};