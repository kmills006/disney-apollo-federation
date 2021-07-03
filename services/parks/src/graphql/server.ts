import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { typeDefs } from './typeDefs';
import { ParkRepository } from '../repository';

const schema = buildFederatedSchema({ typeDefs, resolvers: {} });

export const initiateApolloServer = (repository: ParkRepository) =>
  new ApolloServer({
    schema,
    context: () => ({ repository }),
    mockEntireSchema: true,
  });
