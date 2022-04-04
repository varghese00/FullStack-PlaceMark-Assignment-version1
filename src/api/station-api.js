import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { IdSpec,StationArraySpec,StationSpec,StationSpecPlus } from "../models/joi-schemas.js";

export const stationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
        try {
            const stations = await db.stationStore.getAllStations();
            return stations;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
    },
    tags:["api"],
    response: {schema: StationArraySpec, failAction:validationError},
    description: "Get all stations",
    notes: "Returns all stations"
  },

  findOne: {
    auth: false,
    async handler(request) {
        try {
            const station = await db.stationStore.getStationById(request.params.id);
            if (!station) {
              return Boom.notFound("No station with this id");
            }
            return station;
          } catch (err) {
            return Boom.serverUnavailable("No station with this id");
          }
    },
    tags:["api"],
    response: {schema: StationSpecPlus, failAction:validationError},
    description: "Find a station",
    notes: "Returns all station",
    validate:{ params: { id: IdSpec }, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
        try{
            const station= request.payload;
            const newStation= await db.stationStore.addStation(station);
            if (newStation){
                return h.response(newStation).code(201);
            }
            return Boom.badImplementation("Error creating the station");
        }
        catch(err){
            return Boom.serverUnavailable("Database server error")
        }
    },
    tags:["api"],
    response: {schema: StationSpecPlus, failAction:validationError},
    description: "Create a station",
    notes: "Returns newly created station",
    validate:{ payload: StationSpec, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
        try {
            const station = await db.stationStore.getStationById(request.params.id);
            if (!station) {
              return Boom.notFound("No station with this id");
            }
            await db.stationStore.deleteStationById(station._id);
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("No station with this id");
          }
    },
    tags: ["api"],
    description: "Delete a station",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
        try{
        await db.stationStore.deleteAllStations();
        return h.response().code(204);
        }
        catch(err){
        return Boom.serverUnavailable("Database Error")
        }
    },
    tags: ["api"],
    description: "Delete all StationApi",
  },


};