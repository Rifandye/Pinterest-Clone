const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
    images: [
      {
        name: "Front Cover",
        url: "image.jpeg",
      },
    ],
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
    images: [
      {
        name: "Front Cover",
        url: "image.jpeg",
      },
    ],
  },
];

const categories = [
  {
    name: "Health",
  },
  {
    name: "Education",
  },
  {
    name: "Programming",
  },
];

const typeDefs = `
  type Book {
    title: String
    author: String
    images: [Image]
  }
  
  type Image {
    name: String
    url: String
  }

  type Query {
    books: [Book]
  }

  type Category {
    name: String
  }

  type Query {
    categories: [Category]
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    categories: () => {
      return categories;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//! fomat running server menggunakan common js
startStandaloneServer(server, {
  listen: { port: 3000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
