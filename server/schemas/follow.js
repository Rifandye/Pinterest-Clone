const Follow = require("../models/Follow");

const typeDefs = `
  type Follow {
    _id: ID
    followingId: ID
    followerId: ID
    createdAt: String
    updatedAt: String
  }

  input NewFollow {
    followingId: ID
    followerId: ID
  }

  type Mutation {
    addFollow(newFollow: NewFollow): Follow
  }

`;

const resolvers = {
  Query: {},

  Mutation: {
    addFollow: async (_, args, contexValue) => {
      console.log(contexValue, "<<< context value");
      try {
        const user = contexValue.auth();
        console.log(user, "<<< output user decode");

        const newFollow = { ...args.newFollow, followerId: user.id };

        const follow = await Follow.addFollow(newFollow);
        return follow;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
