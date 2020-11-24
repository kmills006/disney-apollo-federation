import { buildFederatedSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server';
import { DocumentNode } from 'graphql/language/ast';

import { context, IResolverContext } from './context';
import { resolvers, IResolvers } from './resolvers';
import { typeDefs } from './typeDefs';

interface ApolloServerConfiguration<R, C> {
  typeDefs: DocumentNode;
  resolvers: R;
  context: () => C;
  engine?: boolean;
}

export const constructApolloServer = <R = IResolvers, C = IResolverContext>(
  config: ApolloServerConfiguration<R, C>,
): ApolloServer => {
  const schema = buildFederatedSchema({
    resolvers: config.resolvers,
    typeDefs: config.typeDefs,
  });

  return new ApolloServer({
    schema,
    context: () => config.context(),
    engine: config.engine || false,
  });
};

export const server = constructApolloServer({
  context,
  resolvers,
  typeDefs,
});

export const startApolloServer = async (s: ApolloServer) => {
  s.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};
