import { attractionsRepository } from './repository';
import { AttractionAPI } from './graphql/datasource';
import { initiateApolloServer } from './graphql/server';

// TODO: Don't hard code the port in real life.
const PORT = 4002;

const server = initiateApolloServer(attractionsRepository(new AttractionAPI()));

server
  .listen(PORT)
  .then(() => console.log(`Attractions GraphQL API running on port ${PORT}`));
