const { database } = require("../config/mongodb");
const { ObjectId } = require("bson");

module.exports = class Post {
  static async findAllPost() {
    try {
      const postCollection = database.collection("Posts");
      const option = {
        sort: { createdAt: -1 },
      };
      const posts = await postCollection.find({}, option).toArray();
      return posts;
    } catch (error) {
      throw error;
    }
  }

  static async findPostById(id) {
    const postCollection = database.collection("Posts");
    const post = await postCollection.findOne({
      _id: new ObjectId(id),
    });
    console.log(post);
    return post;
  }

  static async createPost(newPost) {
    try {
      const handlePostDate = {
        ...newPost,
        createdAt: new Date(),
        updatedAt: new Date(),
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

  static async addComment(newCommemt) {
    try {
      const { postId, ...commentData } = newCommemt;
      const handleCommentDate = {
        ...commentData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const postCollection = database.collection("Posts");

      const result = await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $push: { comments: handleCommentDate } }
      );

      let resultComment = {
        ...handleCommentDate,
      };

      return resultComment;
    } catch (error) {
      throw error;
    }
  }

  static async addLike(newLike) {
    try {
      const { postId, ...likeData } = newLike;
      console.log(likeData, "<<< like data");
      const handleLikeData = {
        ...likeData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const postCollection = database.collection("Posts");

      const result = await postCollection.updateOne(
        { _id: new ObjectId(postId) },
        { $addToSet: { likes: handleLikeData } }
      );

      let resultLike = {
        ...handleLikeData,
      };

      return resultLike;
    } catch (error) {
      throw error;
    }
  }
};
