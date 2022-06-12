import { v4 } from "uuid";
import {locationMemStore} from "./location-mem-store.js"

let stations = [];

export const stationMemStore = {
  async getAllStations() {
    return stations;
  },

  async getUserStations(userid) {
    return stations.filter((station) => station.userid === userid);
  },

  async addStation(station) {
    station._id = v4();
    stations.push(station);
    return station;
  },

  async getStationById(id) {
    const list= stations.find((station) => station._id === id);
   if (list){
    list.locations= await locationMemStore.getLocationsByStationId(list._id);
   return list;
  } 
    return null;
  },

  async deleteStationById(id) {
    const index = stations.findIndex((station) => station._id === id);
    if (index !==-1) stations.splice(index, 1);
  },

  async deleteAllStations() {
    stations = [];
  },
};