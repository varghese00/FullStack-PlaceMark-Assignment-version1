export const seedData = {

  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2b$10$stzU4kIBD1PuS5GiSR.KjupkzGE8EJCbQMmXiaJ2NQ6tke0xi.cxi",
    
      
    },

    varghese: {
      firstName: "Varghese",
      lastName: "Joseph",
      email: "varghese00@gmail.com",
      password: "$2b$10$stzU4kIBD1PuS5GiSR.KjupkzGE8EJCbQMmXiaJ2NQ6tke0xi.cxi",
      scope:["regular", "admin"]
    
      
    },

    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2b$10$stzU4kIBD1PuS5GiSR.KjupkzGE8EJCbQMmXiaJ2NQ6tke0xi.cxi",


    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "$2b$10$stzU4kIBD1PuS5GiSR.KjupkzGE8EJCbQMmXiaJ2NQ6tke0xi.cxi",


    },
  },

  stations: {
    _model: "Station",
    county_1: {
      name: "Dublin",
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
