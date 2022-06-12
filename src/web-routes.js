import { dashboardController } from "./controllers/dashboard-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { adminController } from "./controllers/admin-access-controller.js";


export const webRoutes = [
    { method: "GET", path: "/about", config: aboutController.index },
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
    { method: "GET", path: "/user-account", config: accountsController.loggedInUserDetails },
    { method: "POST", path: "/updateUserDetails", config: accountsController.updateLoggedInUser },
    { method: "GET", path: "/deleteUserAccount", config: accountsController.deleteUserAccount },

    
    { method: "GET", path: "/admin-access", config: adminController.index},
    { method: "GET", path: "/admin-acess/deleteUser/{id}", config: adminController.deleteUser },


    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addStation", config: dashboardController.addStation },
    { method: "GET", path: "/station/{id}", config: stationController.index },
    { method: "GET", path: "/dashboard/deleteStation/{id}", config: dashboardController.deleteStation },

    { method: "POST", path: "/station/{id}/uploadLocationImage/{locationid}", config:locationController.uploadImage},
    { method: "POST", path: "/station/{id}/addLocation", config: stationController.addLocation },
    { method: "GET", path: "/station/{id}/deleteLocation/{locationid}", config: stationController.deleteLocation },
    { method: "GET", path: "/station/{id}/location/{locationid}", config: locationController.showLocationView },
    { method: "POST", path: "/station/{id}/location/{locationid}", config: locationController.update },



    // to handle images in public folder..uses npm inert plugin
    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }


];