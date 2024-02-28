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

  static async findByUsername(username) {
    try {
      const usersCollection = database.collection("Users");
      const users = await usersCollection
        .find({
          username: { $regex: username, $options: "i" },
        })
        .toArray();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const usersCollection = database.collection("Users");
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followerId",
          as: "followingDetail",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "followingDetail.followingId",
          foreignField: "_id",
          as: "followingUser",
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "followerDetail.followerId",
          foreignField: "_id",
          as: "followerUser",
        },
      },
      {
        $project: {
          followingDetail: 0,
          followerDetail: 0,
        },
      },
      {
        $project: {
          "followingUser._id": 0,
          "followingUser.name": 0,
          "followingUser.email": 0,
          "followingUser.password": 0,
          "followerUser._id": 0,
          "followerUser.name": 0,
          "followerUser.email": 0,
          "followerUser.password": 0,
        },
      },
    ];

    const user = await usersCollection.aggregate(agg).toArray();
    console.log("user", "<<<< ini agg user");
    return user[0];
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
