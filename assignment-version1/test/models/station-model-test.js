import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testStations, county } from "../fixtures.js";
import {assertSubset} from "../test-utils.js"


suite("Station Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.stationStore.deleteAllStations();
    for (let i = 0; i < testStations.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testStations[i] = await db.stationStore.addStation(testStations[i]);
    }
  });

  test("create a station", async () => {
    const station = await db.stationStore.addStation(county);
    assertSubset(county, station);
    assert.isDefined(station._id);
  });

  test("delete all stations", async () => {
    let returnedStations = await db.stationStore.getAllStations();
    assert.equal(returnedStations.length, 3);
    await db.stationStore.deleteAllStations();
    returnedStations = await db.stationStore.getAllStations();
    assert.equal(returnedStations.length, 0);
  });

  test("get a station - success", async () => {
    const station = await db.stationStore.addStation(county);
    const returnedStation = await db.stationStore.getStationById(station._id);
    assertSubset(county, station);
  });

  test("delete One Station - success", async () => {
    const id = testStations[0]._id;
    await db.stationStore.deleteStationById(id);
    const returnedPlaylists = await db.stationStore.getAllStations();
    assertSubset(returnedPlaylists.length, testStations.length - 1);
    const deletedStation = await db.stationStore.getStationById(id);
    assert.isNull(deletedStation);
  });

  test("get a station - bad params", async () => {
    assert.isNull(await db.stationStore.getStationById(""));
    assert.isNull(await db.stationStore.getStationById());
  });

  test("delete One Station - fail", async () => {
    await db.stationStore.deleteStationById("bad-id");
    const allStations = await db.stationStore.getAllStations();
    assertSubset(testStations.length, allStations.length);
  });
});