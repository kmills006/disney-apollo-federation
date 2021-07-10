import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { resolvers } from './resolvers';
import { ParkRepository } from '../repository';
import { typeDefs } from './typeDefs';

const schema = buildFederatedSchema({ resolvers, typeDefs });

export const initiateApolloServer = (repository: ParkRepository) =>
  new ApolloServer({
    schema,
    context: () => ({ repository }),
  });
