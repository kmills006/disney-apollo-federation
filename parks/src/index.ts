import { startApolloServer } from './graphql/server';

startApolloServer().catch((error) => {
  console.error(`Unable to start Parks server: ${error.message}`);
  process.exit(1);
});
