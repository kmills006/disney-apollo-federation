import { startApolloServer } from '@disney-federation/gql-utils';

import { server } from './graphql/server';

startApolloServer(4001)(server).catch((error) => {
  console.error(`Unable to start Attractions server: ${error.message}`);
  process.exit(1);
});
