import { analytics } from "./analytics-calculation.js";

export const userAnalytics = {
  async calculateUserAnalytics() {

    const leastAddedCounty = await analytics.leastAddedCounty();
    const mostAddedCounty = await analytics.mostAddedCounty();

    return { leastAddedCounty, mostAddedCounty};
  },

};