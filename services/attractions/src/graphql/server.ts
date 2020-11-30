import { buildFederatedSchema } from '@apollo/federation';
import { constructApolloServer } from '@disney-federation/gql-utils';

import { context, IResolverContext } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const server = constructApolloServer<IResolverContext>({
  context,
  schema: buildFederatedSchema([{ resolvers, typeDefs }]),
});
