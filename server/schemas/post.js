const Post = require("../models/Post");

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
  }

`;

const resolvers = {
  Query: {
    posts: async () => {
      try {
        const posts = await Post.findAllPost();
        return posts;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {},
};

module.exports = { typeDefs, resolvers };
