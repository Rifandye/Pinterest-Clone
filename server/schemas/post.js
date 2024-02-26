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

  input NewPost {
    id: ID
    content: String
    tags: String
    imgUrl: String
    authorId: ID
    createAt: String
    updatedAt: String
  } 

  type Mutation {
    addPost(newPost: NewPost): Post
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

  Mutation: {
    addPost: async (_, args) => {
      try {
        const newPost = { ...args.newPost };
        const post = await Post.createPost(newPost);
        return post;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
