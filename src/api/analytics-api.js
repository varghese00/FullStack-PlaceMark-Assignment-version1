import { Boom } from "@hapi/boom";
import {analytics} from "../analytics/analytics-calculation.js";


export const analyticsApi = {

    calculate: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const response={
                    mostAddedCounty: await analytics.mostAddedCounty(),
                    leastAddedCounty: await analytics.leastAddedCounty(),
                }
                if(response) {
                    return h.response(response).code(201);
                }
                return Boom.badImplementation("Bad Implementation");
            } catch (err) {
                return Boom.serverUnavailable("Check Database")
            }
        },
        tags: ["api"],
        description: "Calculate Analytics",
        notes: "Analysing the App statistics",
    }

}