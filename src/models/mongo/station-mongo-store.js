import { Station } from "./stations.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const stationMongoStore = {

  async getAllStations() {
    const stations = await Station.find().lean();
    return stations;
  },

  async getAllStationsByName() {
    
      const stations = await Station.find({},{name:1,_id:0,userid:0,__v:0}).lean();
      return stations;
  
  },



  async getStationById(id) {
    if (id) {
      const station = await Station.findOne({ _id: id }).lean();
      if (station) {
        station.locations = await locationMongoStore.getLocationsByStationId(station._id);
      }
      return station;
    }
    return null;
  },

  async addStation(station) {
    const newStation = new Station(station);
    const stationObj = await newStation.save();
    return this.getStationById(stationObj._id);
  },

  async getUserStations(id) {
    const station = await Station.find({ userid: id }).lean();
    return station;
  },

  async deleteStationById(id) {
    try {
      await Station.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllStations() {
    await Station.deleteMany({});
  }
};