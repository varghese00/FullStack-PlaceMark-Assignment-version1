import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testStations, testLocations, county, locationArea } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Location Model tests", () => {

  let stationList = null;

  setup(async () => {
    db.init("mongo");
    await db.stationStore.deleteAllStations();
    await db.locationStore.deleteAllLocations();
    stationList = await db.stationStore.addStation(county);
    for (let i = 0; i < testLocations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testLocations[i] = await db.locationStore.addLocation(stationList._id, testLocations[i]);
    }
  });

  test("create single location", async () => {
    const locationList = await db.stationStore.addStation(county);
    const location = await db.locationStore.addLocation(locationList._id, locationArea)
    assert.isNotNull(location._id);
    assertSubset (locationArea, location);
  });

  test("get multiple locations", async () => {
    const locations = await db.locationStore.getLocationsByStationId(stationList._id);
    assert.equal(testLocations.length, testLocations.length)
  });

  test("delete all locations", async () => {
    const locations = await db.locationStore.getAllLocations();
    assert.equal(testLocations.length, locations.length);
    await db.locationStore.deleteAllLocations();
    const newLocations = await db.locationStore.getAllLocations();
    assert.equal(0, newLocations.length);
  });

  test("get a location - success", async () => {
    const locationList = await db.stationStore.addStation(county);
    const location = await db.locationStore.addLocation(locationList._id, locationArea)
    const newLocation = await db.locationStore.getLocationById(location._id);
    assertSubset (locationArea, newLocation);
  });

  test("delete One location - success", async () => {
    await db.locationStore.deleteLocation(testLocations[0]._id);
    const locations = await db.locationStore.getAllLocations();
    assert.equal(locations.length, testStations.length - 1);
    const deletedLocation = await db.locationStore.getLocationById(testLocations[0]._id);
    assert.isNull(deletedLocation);
  });

  test("get a location - bad params", async () => {
    assert.isNull(await db.locationStore.getLocationById(""));
    assert.isNull(await db.locationStore.getLocationById());
  });

  test("delete one location - fail", async () => {
    await db.locationStore.deleteLocation("bad-id");
    const locations = await db.locationStore.getAllLocations();
    assert.equal(locations.length, testStations.length);
  });
});
