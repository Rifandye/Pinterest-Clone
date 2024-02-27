const { database } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

module.exports = class Follow {
  static async addFollow(newFollow) {
    try {
      const handleFollowDate = {
        ...newFollow,
        followingId: new ObjectId(newFollow.followingId),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const followCollection = database.collection("Follows");
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
