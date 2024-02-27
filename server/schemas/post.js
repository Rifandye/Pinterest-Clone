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
        console.log(user, "<<< hasil decode");
        const posts = await Post.findAllPost();
        return posts;
      } catch (err) {
        throw err;
      }
    },

    postById: async (_, args) => {
      try {
        const { id } = args;
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
        return like;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
