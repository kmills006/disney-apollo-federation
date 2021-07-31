import { ApolloServer } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

import { AttractionAPI } from './datasource';
import { attractionResolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const schema = buildFederatedSchema({
  typeDefs,
  resolvers: attractionResolvers,
});

export const initiateApolloServer = () =>
  new ApolloServer({
    schema,
    dataSources: () => ({
      attractions: new AttractionAPI(),
    }),
  });
