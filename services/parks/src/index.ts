import { startApolloServer } from '@disney-federation/gql-utils';

import { server } from './graphql/server';

startApolloServer(4000)(server).catch((error) => {
  console.error(`Unable to start Parks server: ${error.message}`);
  process.exit(1);
});
