import { ApolloServer } from 'apollo-server';
import 'dotenv/config';

import { PORT } from './config';
import { AttractionsApi } from './datasources/AttractionsApi';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    dataSources: () => ({
      attractionsApi: new AttractionsApi(),
    }),
  });

  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🎢 Attractions service running at ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(`Error starting server: ${error.message}`);

  process.exit(1);
});
