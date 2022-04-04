// eslint-disable-next-line import/no-extraneous-dependencies
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { chargingStationService } from "./chargingStation-service.js";
import { maggie,maggieCredentials, locationArea, testLocations, testStations, county } from "../fixtures.js"

suite("location API tests", () => {
  let user = null;
  let stationModel = null;

  setup(async () => {
    chargingStationService.clearAuth();
    user = await chargingStationService.createUser(maggie);
    await chargingStationService.authenticate(maggieCredentials)
    await chargingStationService.deleteAllStations();
    await chargingStationService.deleteAllLocations();
    await chargingStationService.deleteAllUsers();
    user = await chargingStationService.createUser(maggie);
    await chargingStationService.authenticate(maggieCredentials)
    county.userid = user._id;
    stationModel = await chargingStationService.createStation(county);
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await chargingStationService.createLocation(stationModel._id, locationArea);
    assertSubset(locationArea, returnedLocation);
  });

  test("create Multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await chargingStationService.createLocation(stationModel._id, testLocations[i]);
    }
    const returnedLocations = await chargingStationService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await chargingStationService.getLocation(returnedLocations[i]._id);
      assertSubset(location, returnedLocations[i]);
    }
  });

  test("Delete locationApi", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await chargingStationService.createLocation(stationModel._id, testLocations[i]);
    }
    let returnedLocations = await chargingStationService.getAllLocations();
    assert.equal(returnedLocations.length, testLocations.length);
    for (let i = 0; i < returnedLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const location = await chargingStationService.deleteLocation(returnedLocations[i]._id);
    }
    returnedLocations = await chargingStationService.getAllLocations();
    assert.equal(returnedLocations.length, 0);
  });

  test("denormalised Station", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await chargingStationService.createLocation(stationModel._id, testLocations[i]);
    }
    const returnedStation = await chargingStationService.getStation(stationModel._id);
    assert.equal(returnedStation.locations.length, testLocations.length);
    for (let i = 0; i < testLocations.length; i += 1) {
      assertSubset(testLocations[i], returnedStation.locations[i]);
    }
  });
});