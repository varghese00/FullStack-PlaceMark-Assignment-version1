import { userMemStore } from "./mem/user-mem-store.js";
import { stationMemStore } from "./mem/station-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";

export const db = {
  userStore: null,
  stationStore: null,
  locationStore:null,

  init() {
    this.userStore = userMemStore;
    this.stationStore = stationMemStore;
    this.locationStore=locationMemStore;

  },
};