import { userApi } from "./api/user-api.js";
import { stationApi } from "./api/station-api.js";
import {locationApi} from "./api/location-api.js";
import {analyticsApi} from "./api/analytics-api.js";



export const apiRoutes= [

    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },


    {method: "POST", path: "/api/users", config: userApi.create},
    {method: "GET", path: "/api/users", config: userApi.find},
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "DELETE", path: "/api/users/deleteuser/{id}", config: userApi.deleteOne },
    { method: "GET", path: "/api/users/loggedInUser", config: userApi.getLoggedInUser },
    { method: "POST", path: "/api/users/updateUser/{id}", config: userApi.updateUser},

    { method: "GET", path: "/api/analytics", config: analyticsApi.calculate },


    { method: "POST", path: "/api/stations", config: stationApi.create },
    { method: "DELETE", path: "/api/stations", config: stationApi.deleteAll },
    { method: "GET", path: "/api/stations", config: stationApi.find },
    { method: "GET", path: "/api/stations/{id}", config: stationApi.findOne },
    { method: "GET", path: "/api/stations/userStations", config: stationApi.findByUserId },
    { method: "DELETE", path: "/api/stations/{id}", config: stationApi.deleteOne },


    { method: "GET", path: "/api/locations", config: locationApi.find },
    { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
    { method: "POST", path: "/api/stations/{id}/locations", config: locationApi.create },
    { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
    { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },
    { method: "GET",path: "/api/stations/{id}/locations", config: locationApi.findLocationsByStationId },
    { method: "POST", path: "/api/stations/{id}/locations/{locationid}", config: locationApi.updateLocation},
    { method: "POST", path: "/api/locations/{id}/uploadImage", config: locationApi.uploadImage },






]