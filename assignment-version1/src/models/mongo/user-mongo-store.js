import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    // const users = await User.find({}).lean();

    console.log("users are ", users);
    return users;
  },

  async getUserById(id) {
    if (id) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async getUserByRole(role) {
    const user = await User.findOne({role:"admin"} );
    console.log(user)
    return user;
  },

  

  async deleteUserById(id) {
    try {
      const user = await User.findOne({ _id:id });
      await User.deleteOne({ _id: id });
      console.log("My account is deleted")
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },

  async updateUser(userid, updatedUser) {
    const user = await User.findOne({ _id: userid });
    user.firstName = updatedUser.firstName;
    user.lastName = updatedUser.lastName;
    user.email = updatedUser.email;
    user.password = updatedUser.password;
    await user.save();
    const savedUser = await User.findOne({ "_id": userid}).lean();
    return savedUser;

  },



};