const User = require("../models/User");

const typeDefs = `
  type User {
    _id: ID
    name: String
    username: String
    email: String
    password: String    
  }

  type Query {
    users: [User]
    userById(id: ID!): User
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
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
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
  },
};

module.exports = { typeDefs, resolvers };
