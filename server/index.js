require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schemas/user");

const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schemas/post");

const {
  typeDefs: followTypeDefs,
  resolvers: followResolvers,
} = require("./schemas/follow");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
  resolvers: [userResolvers, postResolvers, followResolvers],
  introspection: true,
});

const { verifyToken } = require("./helpers/jwt");
const { ObjectId } = require("mongodb");

//! fomat running server menggunakan common js
//! ada logic authentication
startStandaloneServer(server, {
  listen: { port: 3000 },
  context: async ({ req }) => {
    return {
      auth: () => {
        const auth = req.headers.authorization;

        if (!auth) throw new Error("Authentication Failed");

        const token = auth.split(" ")[1];
        const decoded = verifyToken(token);
        decoded.id = new ObjectId(String(decoded.id));
        return decoded;
      },
    };
  },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
