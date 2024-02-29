const { database } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

module.exports = class Follow {
  static async addFollow(newFollow) {
    try {
      const handleFollowDate = {
        ...newFollow,
        followingId: new ObjectId(newFollow.followingId),
        followerId: new ObjectId(newFollow.followerId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log(newFollow, "<<< ini newFollow");

      if (handleFollowDate.followerId.equals(handleFollowDate.followingId)) {
        throw new Error("You cannot follow yourself.");
      }

      const followCollection = database.collection("Follows");

      const existingFollow = await followCollection.findOne({
        followingId: handleFollowDate.followingId,
        followerId: handleFollowDate.followerId,
      });

      if (existingFollow) {
        throw new Error("You are already following this user.");
      }

      const result = await followCollection.insertOne(handleFollowDate);

      console.log(result, "<<< Result follow");

      let resultFollow = {
        _id: result.insertedId,
        ...handleFollowDate,
      };

      return resultFollow;
    } catch (error) {
      throw error;
    }
  }
};
