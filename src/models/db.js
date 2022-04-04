import { userMemStore } from "./mem/user-mem-store.js";
import { stationMemStore } from "./mem/station-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { stationJsonStore } from "./json/station-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";

import {connectMongo} from "./mongo/connect.js"
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { stationMongoStore } from "./mongo/station-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";


export const db = {
  userStore: null,
  stationStore: null,
  locationStore:null,

  init(storeType) {
    switch(storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.stationStore = stationJsonStore;
        this.locationStore=locationJsonStore;
        break;
        case "mongo":
          this.userStore = userMongoStore;
          this.stationStore= stationMongoStore;
          this.locationStore=locationMongoStore;
          connectMongo();
          break;
      default:
        this.userStore = userMemStore;
        this.stationStore = stationMemStore;
        this.locationStore=locationMemStore;
    }
  },
};