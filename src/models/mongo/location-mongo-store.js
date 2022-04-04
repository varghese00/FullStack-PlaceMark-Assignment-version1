import { Location } from "./locations.js";

export const locationMongoStore = {

    
  async getLocationsByStationId(id) {
    const locations = await Location.find({ locationid: id }).lean();
    return locations;
  },

  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addLocation(stationId, location) {
    location.stationid = stationId;
    const newLocation = new Location(location);
    const locationObj = await newLocation.save();
    return this.getLocationById(locationObj._id);
  },


  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      return location;
    }
    return null;
  },

  async deleteLocation(id) {
    try {
      await Location.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(location, updatedLocation) {
    location.name = updatedLocation.name;
    location.latitude = updatedLocation.latitude;
    location.longitude = updatedLocation.longitude;
    await location.save();
  },
};

