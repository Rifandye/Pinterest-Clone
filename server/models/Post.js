const { database } = require("../config/mongodb");

module.exports = class Post {
  static async findAllPost() {
    try {
      const postCollection = database.collection("Posts");
      const posts = await postCollection.find().toArray();
      return posts;
    } catch (error) {
      throw error;
    }
  }
};
