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

  static async createPost(newPost) {
    try {
      const handlePostDate = {
        ...newPost,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const postCollection = database.collection("Posts");
      const result = await postCollection.insertOne(handlePostDate);

      console.log(result, "<<< Result post");
      let resultPost = {
        id: result.insertedId,
        ...handlePostDate,
      };
      return resultPost;
    } catch (error) {
      throw error;
    }
  }
};
