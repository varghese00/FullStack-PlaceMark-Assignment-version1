import { v4 } from "uuid";

let locations = [];

export const locationMemStore = {
  async getAllLocations() {
    return locations;
  },

  async addLocation(stationId, location) {
    location._id = v4();
    location.stationid = stationId;
    locations.push(location);
    return location;
  },

  async getLocationsByStationId(id) {
    return locations.filter((location) => location.stationid === id);
  },

  async getLocationById(id) {
    return locations.find((location) => location._id === id);
  },

  async getStationLocations(stationId) {
    return locations.filter((location) => location.stationid === stationId);
  },

  async deleteLocation(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },

  async updateLocation(location, updatedLocation) {
    location.name = updatedLocation.name;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.duration;
  },
};