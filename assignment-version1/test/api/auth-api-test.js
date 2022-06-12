import { assert } from "chai";
import { chargingStationService } from "./chargingStation-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie,maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    chargingStationService.clearAuth();
    await chargingStationService.createUser(maggie);
    await chargingStationService.authenticate(maggieCredentials);
    await chargingStationService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await chargingStationService.createUser(maggie);
    const response = await chargingStationService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await chargingStationService.createUser(maggie);
    const response = await chargingStationService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });



  test("check Unauthorized", async () => {
    chargingStationService.clearAuth();
    try {
      await chargingStationService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });

});