export const seedData = {

  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      role:"regular"
    
      
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      role:"regular"


    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      role:"regular"


    },
  },

  stations: {
    _model: "Station",
    county_1: {
      name: "Waterford",
      userid: "->users.bart",
    },
    county_2: {
      name: "Cork",
      userid: "->users.homer",
    },
    county_3: {
      name: "Kerry",
      userid: "->users.marge",
    },
  },

  locations: {
    _model: "Location",
    location_1: {
      name: "Dungarvan",
      latitude: 30,
      longitude: 15,
      category: "Type 1 Plug",
      description: "On-street Parking",
      stationid: "->stations.county_1",
    },
    location_2: {
      name: "Youghal",
      latitude: 20,
      longitude: 10,
      category: "Type 2 Plug",
      description: "Tesco Parking",
      stationid: "->stations.county_2",
    },
    location_3: {
      name: "Tralee",
      latitude: 60,
      longitude: 10,
      category: "Tesla Super Charger",
      description: "Fuel Station",
      stationid: "->stations.county_3",
    },
  },
};
