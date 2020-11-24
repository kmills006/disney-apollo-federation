import { server, startApolloServer } from './graphql/server';

startApolloServer(server).catch((error) => {
  console.error(`Unable to start Parks server: ${error.message}`);
  process.exit(1);
});
