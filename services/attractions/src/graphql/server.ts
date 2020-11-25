import { buildFederatedSchema } from '@apollo/federation';
import { constructApolloServer } from '@disney-federation/gql-utils';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const server = constructApolloServer({
  schema: buildFederatedSchema({ resolvers, typeDefs }),
  context: () => {},
});
