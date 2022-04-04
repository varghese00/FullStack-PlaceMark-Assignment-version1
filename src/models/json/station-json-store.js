import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile,Low } from "lowdb";
import {locationJsonStore} from "./location-json-store.js"

const db = new Low(new JSONFile("./src/models/json/stations.json"));
db.data = { stations: [] };

export const stationJsonStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async getUserStations(userid) {
      await db.read();
    return db.data.stations.filter((station) => station.userid === userid);
  },

  async addStation(station) {
    station._id = v4();
    await db.read();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list= db.data.stations.find((station) => station._id === id);
    list.locations= await locationJsonStore.getLocationsByStationId(list._id);
    return list;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllstations() {
    db.data.stations = [];
    await db.write();
  },
};