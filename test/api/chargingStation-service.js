/* eslint-disable dot-notation */
import axios from "axios";


import { serviceUrl } from "../fixtures.js";




export const chargingStationService={

    stationUrl: serviceUrl,

    async authenticate(user) {
      const response = await axios.post(`${this.stationUrl}/api/users/authenticate`, user);
      // eslint-disable-next-line dot-notation
      // eslint-disable-next-line prefer-template
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    },
  
    async clearAuth() {
      axios.defaults.headers.common["Authorization"] = "";
    },

    async createUser(user) {
      const res = await axios.post(`${this.stationUrl}/api/users`, user);
      return res.data;
    },

    async getUser(id) {
        const res = await axios.get(`${this.stationUrl}/api/users/${id}`);
        return res.data;
      },
    
      async getAllUsers() {
        const res = await axios.get(`${this.stationUrl}/api/users`);
        return res.data;
      },
    
      async deleteAllUsers() {
        const res = await axios.delete(`${this.stationUrl}/api/users`);
        return res.data;
      },

      async deleteUser(id) {
        const res = await axios.delete(`${this.stationUrl}/api/users/${id}`);
        return res.data;
      },





      async createStation(station) {
        const res = await axios.post(`${this.stationUrl}/api/stations`, station);
        return res.data;
      },
    
      async deleteAllStations() {
        const response = await axios.delete(`${this.stationUrl}/api/stations`);
        return response.data;
      },
    
      async deleteStation(id) {
        const response = await axios.delete(`${this.stationUrl}/api/stations/${id}`);
        return response;
      },
    
      async getAllStations() {
        const res = await axios.get(`${this.stationUrl}/api/stations`);
        return res.data;
      },
    
      async getStation(id) {
        const res = await axios.get(`${this.stationUrl}/api/stations/${id}`);
        return res.data;
      },






      async getAllLocations() {
        const res = await axios.get(`${this.stationUrl}/api/locations`);
        return res.data;
      },
    
      async createLocation(stationid, location) {
        location.stationid = stationid;
        const res = await axios.post(`${this.stationUrl}/api/stations/${stationid}/locations`, location);
        return res.data;
      },
    
      async getLocation(id) {
        try {
          const res = await axios.get(`${this.stationUrl}/api/locations/${id}`);
          return res.data;
        } catch (error) {
          console.log("no such id");
          return null;
        }
      },
    
      async deleteLocation(id) {
        try {
          await axios.delete(`${this.stationUrl}/api/locations/${id}`);
        } catch (error) {
          console.log("bad id");
        }
      },
    
      async deleteAllLocations() {
        const res = await axios.delete(`${this.stationUrl}/api/locations`);
        return res.data;
      },
    

};