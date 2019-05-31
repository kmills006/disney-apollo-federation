import { ApolloServer } from 'apollo-server';
import 'dotenv/config';

import { PORT } from './config';
import { DiningApi } from './datasources/DiningApi';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

const startServer = async () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    dataSources: () => ({
      diningApi: new DiningApi(),
    }),
  });

  server.listen({ port: PORT }).then(({ url }: { url: string }) => {
    console.log(`🍔 Dining service running at ${url}`);
  });
};

startServer().catch((error: Error) => {
  console.error(`Error starting server: ${error.message}`);

  process.exit(1);
});
