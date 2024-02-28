const { ObjectId } = require("mongodb");
const { database } = require("../config/mongodb");
const { hashPass, comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

module.exports = class User {
  //! nyoba findAll
  static async findAll() {
    try {
      const usersCollection = database.collection("Users");
      const users = await usersCollection.find().toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }

  //! nyoba findById
  static async findById(id) {
    const usersCollection = database.collection("Users");
    const user = await usersCollection.findOne({
      _id: new ObjectId(id),
    });

    return user;
  }

  static async register(newUser) {
    const userCollection = database.collection("Users");

    const hashedPass = hashPass(newUser.password);
    newUser.password = hashedPass;

    const result = await userCollection.insertOne(newUser);

    console.log(result, "<<<< Result");
    let resultUser = {
      id: result.insertedId,
      ...newUser,
    };
    return resultUser;
  }

  static async login(LoginInput) {
    const userCollection = database.collection("Users");

    const user = await userCollection.findOne({ email: LoginInput.email });

    const comparedPass = comparePass(LoginInput.password, user.password);

    if (!comparedPass) throw { message: "Email/Password is invalid" };

    const access_token = signToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    console.log(access_token);

    return { access_token };
  }
};
