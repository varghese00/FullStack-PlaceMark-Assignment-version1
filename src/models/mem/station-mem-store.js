import { v4 } from "uuid";
import {locationMemStore} from "./location-mem-store.js"

let stations = [];

export const stationMemStore = {
  async getAllStations() {
    return stations;
  },

  async addStation(station) {
    station._id = v4();
    stations.push(station);
    return station;
  },

  async getStationById(id) {
    const list= stations.find((station) => station._id === id);
    list.locations= await locationMemStore.getLocationsByStationId(list._id);
    return list;
  },

  async deleteStationById(id) {
    const index = stations.findIndex((station) => station._id === id);
    stations.splice(index, 1);
  },

  async deleteAllstations() {
    stations = [];
  },
};