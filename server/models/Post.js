const { database } = require("../config/mongodb");
const { ObjectId } = require("mongodb");


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
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "authorDetail",
        },
      },
      {
        $unwind: {
          path: "$authorDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "authorDetail.password": 0,
        },
      },
    ];

    const post = await postCollection.aggregate(agg).toArray();
    console.log(post, "<<< ini user agg");
    return post[0];
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

      console.log(handlePostDate, "<<< ini handlePostDate");
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
