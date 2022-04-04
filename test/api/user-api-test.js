import { assert } from "chai";

import { assertSubset } from "../test-utils.js";
import { maggie,testUsers } from "../fixtures.js";
import { chargingStationService } from "./chargingStation-service.js";


const users = new Array(testUsers.length);


suite("User API tests", () => {

    setup(async () => {
      await chargingStationService.deleteAllUsers();
      for (let i = 0; i < testUsers.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        users[0] = await chargingStationService.createUser(testUsers[i]);
      }
    });
    
    teardown(async () => {
    });
  
    test("create a user", async () => {
      const newUser= await chargingStationService.createUser(maggie);
      assertSubset(maggie,newUser);
      assert.isDefined(newUser._id);
    });


    test("delete all userApi", async () => {
      let returnedUsers = await chargingStationService.getAllUsers();
      assert.equal(returnedUsers.length, 3);
      await chargingStationService.deleteAllUsers();
      returnedUsers = await chargingStationService.getAllUsers();
      assert.equal(returnedUsers.length, 0);
    });

    test("get a user - success", async () => {
      const returnedUser = await chargingStationService.getUser(users[0]._id);
      assert.deepEqual(users[0], returnedUser);
    });

    test("get a user - fail", async () => {
      try {
        const returnedUser = await chargingStationService.getUser("1234");
        assert.fail("Should not return a response");
      }
      catch(error){
        assert(error.response.data.message === "No User with this id");
      }

    });

    test("get a user - bad id", async () => {
      try {
        const returnedUser = await chargingStationService.getUser("1234");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No User with this id");
        assert.equal(error.response.data.statusCode, 503);
      }
    });
  
    test("get a user - deleted user", async () => {
      
      await chargingStationService.deleteAllUsers();
      try {
        const returnedUser = await chargingStationService.getUser(users[0]._id);
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No User with this id");
        assert.equal(error.response.data.statusCode, 404);
      }
    });


  });