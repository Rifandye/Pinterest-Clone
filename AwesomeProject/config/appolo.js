import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://d60b-2001-448a-3051-b6c-253e-a120-cda9-80f0.ngrok-free.app/",
  cache: new InMemoryCache(),
});

export default client;
