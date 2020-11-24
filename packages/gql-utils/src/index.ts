import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';

export interface IApolloServerConfiguration<C> {
  schema: GraphQLSchema;
  context: () => C;
  engine?: boolean;
}

export const constructApolloServer = <C = {}>(
  config: IApolloServerConfiguration<C>,
): ApolloServer => (
    new ApolloServer({
      schema: config.schema,
      context: () => config.context(),
      engine: config.engine || false,
    })
  );

export const startApolloServer = (
  port: number,
) => async (s: ApolloServer): Promise<void> => {
  s.listen(port).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};
