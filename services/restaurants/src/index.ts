import { startApolloServer } from '@disney-federation/gql-utils';

import { server } from './graphql/server';

startApolloServer(4002)(server).catch((error) => {
  console.error(`Unable to start Restaurants server: ${error.message}`);
  process.exit(1);
});
