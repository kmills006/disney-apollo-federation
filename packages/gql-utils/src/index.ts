import { ApolloServer } from 'apollo-server';
import { GraphQLSchema, GraphQLResolveInfo } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';

import { logResolverTime } from './middleware';

export type ResolveType<P, T> = (parent: P) => T | null;

export type ResolverFunc<R, C = {}, A = {}, P = {}> = (
  parent: P,
  args: A,
  ctx: C,
  info: GraphQLResolveInfo
) => R;

export interface IApolloServerConfiguration<C> {
  schema: GraphQLSchema;
  context: () => C;
  engine?: boolean;
}

export const constructApolloServer = <C = {}>(
  config: IApolloServerConfiguration<C>,
): ApolloServer => (
    new ApolloServer({
      schema: applyMiddleware(config.schema, logResolverTime),
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

export const findTypeNameInParent = <T extends string, P = {}>(
  parent: P,
  mapping: string[][],
): T | null => {
  const [, typename] = mapping.find(([property]) => property in parent) || [null, null];

  return typename as T;
};
