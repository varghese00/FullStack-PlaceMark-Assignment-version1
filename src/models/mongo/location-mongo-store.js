import { Location } from "./locations.js";

export const locationMongoStore = {

    
  async getLocationsByStationId(id) {
    try{
      const locations = await Location.find({ stationid: id }).lean();
      console.log("station locations by station id are retreived in location mongostore at backend")
      return locations;
    }
    catch(error){
      console.log("station locations are not retreived at backend")
      return true;

    }
    

  },

  async getAllLocations() {
    const locations = await Location.find().lean();
    return locations;
  },

  async addLocation(stationId, location) {
    try{
      location.stationid = stationId;
      const newLocation = new Location(location);
      const locationObj = await newLocation.save();
      console.log("Location object is ",locationObj)
      console.log("location added")
      return this.getLocationById(locationObj._id);
    }
    catch(error){
      console.log("location not added at location mongo store")
    }
    return true; // check this return if causing problem

  },


  async getLocationById(id) {
    if (id) {
      const location = await Location.findOne({ _id: id }).lean();
      console.log("location id not retreived")

      return location;
    }
    console.log("location id not retreived")
      
    return null;
  },


  async deleteLocation(id) {
    try {
      await Location.deleteOne({ _id: id });
      console.log("location deleted")

    } catch (error) {
      console.log("location not deleted")
      console.log("bad id");
    }
  },

  async deleteAllLocations() {
    await Location.deleteMany({});
  },

  async updateLocation(locationid, updatedLocation) {
    try{
      const location= await Location.findOne({_id:locationid})
      location.name = updatedLocation.name;
      location.latitude = updatedLocation.latitude;
      location.longitude = updatedLocation.longitude;
      location.category= updatedLocation.category;
      location.description= updatedLocation.description;
      location.img= updatedLocation.img;
      console.log("location updated")
      await location.save();
    }
    catch (error){
      console.log("location not updated")
    }
  },


};

