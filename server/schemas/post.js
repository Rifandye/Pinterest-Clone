const Post = require("../models/Post");
const redis = require("../config/redis");

const typeDefs = `
  type Post {
    _id: ID
    content: String
    tags: String
    imgUrl: String
    authorId: ID    
    comments: [Comment]
    likes: [Like]
    createdAt: String
    updatedAt: String
    authorDetail: AuthorDetail
  }

  type AuthorDetail {
    _id: ID
    name: String
    username: String
    email: String
  }

  type Comment {
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
    postById(id: ID!): Post
  }

  input NewPost {
    id: ID
    content: String
    tags: String
    imgUrl: String
    authorId: ID
    createdt: String
    updatedAt: String
  }

  input NewComment {
    postId: ID!
    content: String
    username: String
    createdAt: String
    updatedAt: String
  }

  input NewLike {
    postId: ID!
    username: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    addPost(newPost: NewPost): Post
    addComment(newComment: NewComment): Comment
    addLike(newLike: NewLike): Like
  }

`;

const resolvers = {
  Query: {
    posts: async (_, __, contextValue) => {
      try {
        console.log(contextValue, "<<< context value");
        const user = contextValue.auth();
        const postCache = await redis.get("posts:all");

        if (postCache) {
          console.log("ini dari cache");
          const postsData = JSON.parse(postCache);
          return postsData;
        }
        // console.log(user, "<<< hasil decode");
        console.log("ini dari mongodb");
        const posts = await Post.findAllPost();
        await redis.set("posts:all", JSON.stringify(posts));
        return posts;
      } catch (err) {
        throw err;
      }
    },

    postById: async (_, args, contextValue) => {
      try {
        const { id } = args;
        const user = contextValue.auth();
        console.log(id);
        const post = await Post.findPostById(id);
        return post;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    addPost: async (_, args, contextValue) => {
      try {
        const user = contextValue.auth();
        const newPost = { ...args.newPost, authorId: user.id };
        const post = await Post.createPost(newPost);

        // cache invalidation
        await redis.del("posts:all");

        return post;
      } catch (err) {
        throw err;
      }
    },
    addComment: async (_, args, contextValue) => {
      try {
        const user = contextValue.auth();

        const newComment = { ...args.newComment, username: user.username };

        const comment = await Post.addComment(newComment);

        await redis.del("posts:all");
        return comment;
      } catch (err) {
        throw err;
      }
    },
    addLike: async (_, args, contextValue) => {
      try {
        const user = contextValue.auth();

        const newLike = { ...args.newLike, username: user.username };

        const like = await Post.addLike(newLike);

        await redis.del("posts:all");

        return like;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
