import { ApolloServer } from 'apollo-server';

import { resolvers } from './data/resolvers';
import { typeDefs } from './data/types';

const server = new ApolloServer({ resolvers, typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

