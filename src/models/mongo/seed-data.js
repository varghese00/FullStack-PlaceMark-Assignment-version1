export const seedData = {

  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "$2a$10$BbHdSQu.SlSqbSpzeaJrOenOtr2033Z3hkB66JfvUNLiCnkRTAp22",
    
      
    },

    varghese: {
      firstName: "Varghese",
      lastName: "Joseph",
      email: "varghese00@gmail.com",
      password: "8993f901c3d7f1992b490bbd2daca111061de849360cd204193aea54f30e3d62",
      scope:["regular", "admin"]
    
      
    },

    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "$2a$10$21LTpgZAC9c/KbR3ojrQKuGJS0gGgH9IfzSQSGAgXE9kS12tp3g56",


    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",


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
      // img: {img: "http://res.cloudinary.com/dbtrpap44/image/upload/v1654362586/hjfgty67yhgt56ghyt67.jpg", imgid: "hjfgty67yhgt56ghyt67"}

    },
    location_2: {
      name: "Youghal",
      latitude: 20,
      longitude: 10,
      category: "Type 2 Plug",
      description: "Tesco Parking",
      stationid: "->stations.county_2",
      // img: {img: "http://res.cloudinary.com/dbtrpap44/image/upload/v1654362586/hjfgty67yhgt56ghyt67.jpg", imgid: "hjfgty67yhgt56ghyt67"}

    },
    location_3: {
      name: "Tralee",
      latitude: 60,
      longitude: 10,
      category: "Tesla Super Charger",
      description: "Fuel Station",
      stationid: "->stations.county_3",
      // img: {img: "http://res.cloudinary.com/dbtrpap44/image/upload/v1654362586/hjfgty67yhgt56ghyt67.jpg", imgid: "hjfgty67yhgt56ghyt67"}

    },
  },
};
