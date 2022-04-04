// import { userMemStore } from "./mem/user-mem-store.js";
// import { stationMemStore } from "./mem/station-mem-store.js";
// import { locationMemStore } from "./mem/location-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { stationJsonStore } from "./json/station-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";



export const db = {
  userStore: null,
  stationStore: null,
  locationStore:null,

  init() {
    this.userStore = userJsonStore;
    this.stationStore = stationJsonStore;
    this.locationStore=locationJsonStore;

  },
};