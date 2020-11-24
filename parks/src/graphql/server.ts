import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';

import { context, IResolverContext } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

interface ApolloServerConfiguration<C> {
  schema: GraphQLSchema;
  context: () => C;
  engine?: boolean;
}

export const constructApolloServer = <C = IResolverContext>(
  config: ApolloServerConfiguration<C>,
): ApolloServer => (
    new ApolloServer({
      schema: config.schema,
      context: () => config.context(),
      engine: config.engine || false,
    })
  );

export const server = constructApolloServer({
  context,
  schema: buildFederatedSchema([{ resolvers, typeDefs }]),
});

export const startApolloServer = async (s: ApolloServer) => {
  s.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};
