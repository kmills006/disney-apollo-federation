import { initiateApolloServer } from './graphql/server';

// TODO: Don't hard code the port in real life.
const PORT = process.env.PORT || 4001;

const server = initiateApolloServer();

server
  .listen(PORT)
  .then(() => console.log(`Attractions GraphQL API running on port ${PORT}`));
