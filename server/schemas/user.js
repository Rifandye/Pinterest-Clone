const User = require("../models/User");

const typeDefs = `
  type User {
    _id: ID
    name: String
    username: String
    email: String
    followingUser: [FollowingUser]
    followerUser: [FollowerUser]
  }

  type FollowingUser {
    username: String
  }

  type FollowerUser {
    username: String
  }

  type Login {
    access_token: String
  }

  type Query {
    users: [User]
    userById(id: ID!): User
    searchUserByUsername(username: String!): [User]
  }

  input LoginInput {
    email: String!
    password: String!
  }
  
  input NewUser {
    id: Int
    name: String
    username: String
    email: String
    password: String
  }

  type Mutation {
    addUser(newUser: NewUser) : User
    login(inputLogin: LoginInput) : Login
  }
`;

const resolvers = {
  Query: {
    users: async (_, __, contextValue) => {
      try {
        const user = contextValue.auth();
        const users = await User.findAll();
        return users;
      } catch (err) {
        throw err;
      }
    },

    userById: async (_, args) => {
      try {
        const { id } = args;
        console.log(id);
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw err;
      }
    },

    searchUserByUsername: async (_, args) => {
      try {
        const { username } = args;
        const profile = await User.findByUsername(username);
        return profile;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      try {
        const newUser = { ...args.newUser };
        const user = await User.register(newUser);
        return user;
      } catch (err) {
        throw err;
      }
    },
    login: async (_, args) => {
      try {
        const inputLogin = { ...args.inputLogin };
        console.log(inputLogin, "<<<< input login");
        const login = await User.login(inputLogin);
        return login;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
