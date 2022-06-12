import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { IdSpec,StationArraySpec,StationSpec,StationSpecPlus } from "../models/joi-schemas.js";

export const stationApi = {
  find: {
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
        try {
            const stations = await db.stationStore.getAllStations();
            console.log("Checking stations array ", stations)
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
    auth: {
      strategy: "jwt",
    },    async handler(request) {
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


  findByUserId: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const stations = await db.stationStore.getUserStations(request.auth.credentials._id);
        console.log(stations)
        console.log("Stations are retreived")
        return stations;
      } catch (err) {
        console.log("Stations are not retreived")

        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: StationArraySpec, failAction: validationError },
    description: "Get all Stations",
    notes: "Returns all Stations",
  },

  create: {
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
        try{
            const station=request.payload;
            station.userid=request.auth.credentials._id;
            const newStation= await db.stationStore.addStation(station);
            if (newStation){
              console.log("New station object " , newStation , " is added staion name is " , station.name)
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
    validate:{ payload: StationSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
        try {
            const station = await db.stationStore.getStationById(request.params.id);
            if (!station) {
              return Boom.notFound("No station with this id");
            }
            await db.stationStore.deleteStationById(station._id);
            console.log("Staion ", station.name , " is deletetd")

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
    auth: {
      strategy: "jwt",
    },    handler: async function (request, h) {
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