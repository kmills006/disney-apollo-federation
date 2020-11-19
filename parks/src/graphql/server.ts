import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';

import { parkRepository } from '../repositories';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const apolloServer = () => async () => {
  const schema = buildFederatedSchema({ resolvers, typeDefs });

  const server = new ApolloServer({
    schema,
  });

  console.log(`Parks Repository: ${parkRepository}`);

  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

export const startApolloServer = apolloServer();
